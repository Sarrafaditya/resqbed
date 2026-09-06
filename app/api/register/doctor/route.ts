import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { sql } from '../../../utils/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'tap2bed_secret_key';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const hospitalName = formData.get('hospitalName') as string;
    const degreeCertificate = formData.get('degreeCertificate') as File;

    if (!username || !password || !firstName || !lastName || !hospitalName || !degreeCertificate) {
      return NextResponse.json(
        { message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const employeeCode = generateEmployeeCode(hospitalName);

    // Insert user into Postgres
    try {
      const newUser = await sql`
        INSERT INTO users (
          username, 
          password, 
          first_name, 
          last_name, 
          hospital_name, 
          employee_code, 
          user_type, 
          is_active
        ) VALUES (
          ${username.toLowerCase()},
          ${hashedPassword},
          ${firstName},
          ${lastName},
          ${hospitalName},
          ${employeeCode},
          'doctor',
          true
        )
        RETURNING *
      `.then(res => res[0]);

    const token = await new SignJWT({
      userId: newUser.id,
      username: newUser.username,
      userType: newUser.user_type,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secretKey);

    const doctorWithoutPassword = {
      id: newUser.id,
      username: newUser.username,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      hospitalName: newUser.hospital_name,
      employeeCode: newUser.employee_code,
      userType: newUser.user_type,
      isActive: newUser.is_active,
    };

    return NextResponse.json({
      message: 'Doctor registered successfully',
      doctor: doctorWithoutPassword,
      employeeCode,
      token,
    });
    } catch (error: any) {
      if (error.code === '23505') { // postgres unique violation
        return NextResponse.json(
          { message: 'Username already exists' },
          { status: 409 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Doctor registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateEmployeeCode(hospitalName: string): string {
  const prefix = hospitalName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 3) || 'DOC';

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${randomNum}`;
}

export async function GET(request: NextRequest) {
  try {
    const doctors = await sql`
      SELECT id, username, first_name, last_name, hospital_name, employee_code, is_active 
      FROM users 
      WHERE user_type = 'doctor'
    `;

    const mappedDoctors = doctors.map(d => ({
      id: d.id,
      username: d.username,
      firstName: d.first_name,
      lastName: d.last_name,
      hospitalName: d.hospital_name,
      employeeCode: d.employee_code,
      isActive: d.is_active,
      userType: 'doctor'
    }));

    return NextResponse.json(mappedDoctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
