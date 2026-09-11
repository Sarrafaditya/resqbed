import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { sql } from '../../../utils/supabase';

// Ensures the GET (hospital list) below always runs fresh instead of being
// statically cached at build/deploy time.
export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'resqbed_secret_key';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      username,
      password,
      hospitalName,
      hospitalType,
      address,
      contactNumber,
      totalBeds,
      totalICUBeds = 0,
      totalVentilators = 0,
      oxygenCylinders = 0
    } = data;

    if (!username || !password || !hospitalName || !hospitalType || !address || !contactNumber || !totalBeds) {
      return NextResponse.json(
        { message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const firstName = hospitalName.split(' ')[0];

    // Insert user into Postgres
    let newUser;
    try {
      newUser = await sql`
        INSERT INTO users (
          username, 
          password, 
          first_name, 
          last_name, 
          hospital_name, 
          user_type, 
          is_active
        ) VALUES (
          ${username.toLowerCase()},
          ${hashedPassword},
          ${firstName},
          'Admin',
          ${hospitalName},
          'hospital',
          true
        )
        RETURNING *
      `.then(res => res[0]);
    } catch (userError: any) {
      if (userError.code === '23505') {
        return NextResponse.json(
          { message: 'Username already exists' },
          { status: 409 }
        );
      }
      throw userError;
    }

    // Insert hospital inventory
    try {
      await sql`
        INSERT INTO hospitals (
          id,
          hospital_name,
          hospital_type,
          address,
          contact_number,
          total_beds,
          available_beds,
          total_icu_beds,
          available_icu_beds,
          total_ventilators,
          available_ventilators,
          oxygen_cylinders,
          available_oxygen_cylinders
        ) VALUES (
          ${newUser.id},
          ${hospitalName},
          ${hospitalType},
          ${address},
          ${contactNumber},
          ${Number(totalBeds)},
          ${Number(totalBeds)},
          ${Number(totalICUBeds || 0)},
          ${Number(totalICUBeds || 0)},
          ${Number(totalVentilators || 0)},
          ${Number(totalVentilators || 0)},
          ${Number(oxygenCylinders || 0)},
          ${Number(oxygenCylinders || 0)}
        )
      `;
    } catch (hospitalError) {
      // rollback user
      await sql`DELETE FROM users WHERE id = ${newUser.id}`;
      throw hospitalError;
    }

    const token = await new SignJWT({
      userId: newUser.id,
      username: newUser.username,
      userType: newUser.user_type,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secretKey);

    const hospitalResponse = {
      id: newUser.id,
      username: newUser.username,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      hospitalName: hospitalName,
      hospitalType: hospitalType,
      address,
      contactNumber,
      totalBeds: Number(totalBeds),
      availableBeds: Number(totalBeds),
      totalICUBeds: Number(totalICUBeds),
      availableICUBeds: Number(totalICUBeds),
      totalVentilators: Number(totalVentilators),
      availableVentilators: Number(totalVentilators),
      oxygenCylinders: Number(oxygenCylinders),
      availableOxygenCylinders: Number(oxygenCylinders),
      userType: 'hospital',
      isActive: true,
    };

    return NextResponse.json({
      message: 'Hospital registered successfully',
      hospital: hospitalResponse,
      token,
    });
  } catch (error) {
    console.error('Hospital registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    let queryCondition = '';
    if (type === 'higher' || type === 'local') {
      queryCondition = 'AND h.hospital_type = ${type}';
    }

    const data = await sql`
      SELECT 
        u.id, u.username, u.first_name, u.last_name, u.is_active, u.user_type,
        h.hospital_name, h.hospital_type, h.address, h.contact_number,
        h.total_beds, h.available_beds, h.total_icu_beds, h.available_icu_beds,
        h.total_ventilators, h.available_ventilators, h.oxygen_cylinders, h.available_oxygen_cylinders
      FROM users u
      LEFT JOIN hospitals h ON u.id = h.id
      WHERE u.user_type = 'hospital'
    `;

    let hospitals = data.map((row: any) => ({
      id: row.id,
      username: row.username,
      firstName: row.first_name,
      lastName: row.last_name,
      userType: row.user_type,
      isActive: row.is_active,
      hospitalName: row.hospital_name,
      hospitalType: row.hospital_type,
      address: row.address,
      contactNumber: row.contact_number,
      totalBeds: row.total_beds,
      availableBeds: row.available_beds,
      totalICUBeds: row.total_icu_beds,
      availableICUBeds: row.available_icu_beds,
      totalVentilators: row.total_ventilators,
      availableVentilators: row.available_ventilators,
      oxygenCylinders: row.oxygen_cylinders,
      availableOxygenCylinders: row.available_oxygen_cylinders
    }));

    if (type === 'higher' || type === 'local') {
      hospitals = hospitals.filter((h: any) => h.hospitalType === type);
    }

    return NextResponse.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}