import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../utils/supabase';

// GET hospital details including bed availability
export async function GET(
  request: NextRequest,
  { params }: { params: { hospitalId: string } }
) {
  try {
    const hospitalId = params.hospitalId;

    // Fetch hospital with joined user data
    const row = await sql`
      SELECT u.id, u.username, u.first_name, u.last_name, u.is_active, u.user_type,
        h.hospital_name, h.hospital_type, h.address, h.contact_number,
        h.total_beds, h.available_beds, h.total_icu_beds, h.available_icu_beds,
        h.total_ventilators, h.available_ventilators, h.oxygen_cylinders, h.available_oxygen_cylinders
      FROM users u
      LEFT JOIN hospitals h ON u.id = h.id
      WHERE u.user_type = 'hospital' AND u.id = ${hospitalId}
      LIMIT 1
    `.then(res => res[0]);

    if (!row) {
      return NextResponse.json(
        { message: 'Hospital not found' },
        { status: 404 }
      );
    }

    const hospitalData = {
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
    };

    return NextResponse.json(hospitalData);
  } catch (error) {
    console.error('Error fetching hospital details:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update bed availability and other resources
export async function PUT(
  request: NextRequest,
  { params }: { params: { hospitalId: string } }
) {
  try {
    const hospitalId = params.hospitalId;
    const data = await request.json();

    // Check if hospital exists
    const hospital = await sql`
      SELECT * FROM hospitals WHERE id = ${hospitalId} LIMIT 1
    `.then(res => res[0]);

    if (!hospital) {
      return NextResponse.json(
        { message: 'Hospital not found' },
        { status: 404 }
      );
    }

    // Validate the data
    if (data.availableBeds !== undefined && (
      isNaN(Number(data.availableBeds)) ||
      Number(data.availableBeds) < 0 ||
      Number(data.availableBeds) > hospital.total_beds
    )) {
      return NextResponse.json(
        { message: 'Invalid number of available beds' },
        { status: 400 }
      );
    }

    if (data.availableICUBeds !== undefined && (
      isNaN(Number(data.availableICUBeds)) ||
      Number(data.availableICUBeds) < 0 ||
      Number(data.availableICUBeds) > hospital.total_icu_beds
    )) {
      return NextResponse.json(
        { message: 'Invalid number of available ICU beds' },
        { status: 400 }
      );
    }

    if (data.availableVentilators !== undefined && (
      isNaN(Number(data.availableVentilators)) ||
      Number(data.availableVentilators) < 0 ||
      Number(data.availableVentilators) > hospital.total_ventilators
    )) {
      return NextResponse.json(
        { message: 'Invalid number of available ventilators' },
        { status: 400 }
      );
    }

    if (data.availableOxygenCylinders !== undefined && (
      isNaN(Number(data.availableOxygenCylinders)) ||
      Number(data.availableOxygenCylinders) < 0 ||
      Number(data.availableOxygenCylinders) > hospital.oxygen_cylinders
    )) {
      return NextResponse.json(
        { message: 'Invalid number of available oxygen cylinders' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (data.availableBeds !== undefined) updateData.available_beds = Number(data.availableBeds);
    if (data.availableICUBeds !== undefined) updateData.available_icu_beds = Number(data.availableICUBeds);
    if (data.availableVentilators !== undefined) updateData.available_ventilators = Number(data.availableVentilators);
    if (data.availableOxygenCylinders !== undefined) updateData.available_oxygen_cylinders = Number(data.availableOxygenCylinders);

    // Build dynamic SET clause parts
    const setClauses: string[] = [];
    const values: any[] = [];
    let paramIdx = 1;
    if (updateData.available_beds !== undefined) { setClauses.push(`available_beds = $${paramIdx++}`); values.push(updateData.available_beds); }
    if (updateData.available_icu_beds !== undefined) { setClauses.push(`available_icu_beds = $${paramIdx++}`); values.push(updateData.available_icu_beds); }
    if (updateData.available_ventilators !== undefined) { setClauses.push(`available_ventilators = $${paramIdx++}`); values.push(updateData.available_ventilators); }
    if (updateData.available_oxygen_cylinders !== undefined) { setClauses.push(`available_oxygen_cylinders = $${paramIdx++}`); values.push(updateData.available_oxygen_cylinders); }

    // Use individual tagged queries for each field updated to keep type safety
    const updatedHospital = await sql`
      UPDATE hospitals SET
        available_beds = COALESCE(${updateData.available_beds ?? null}, available_beds),
        available_icu_beds = COALESCE(${updateData.available_icu_beds ?? null}, available_icu_beds),
        available_ventilators = COALESCE(${updateData.available_ventilators ?? null}, available_ventilators),
        available_oxygen_cylinders = COALESCE(${updateData.available_oxygen_cylinders ?? null}, available_oxygen_cylinders)
      WHERE id = ${hospitalId}
      RETURNING *
    `.then(res => res[0]);

    return NextResponse.json({
      message: 'Hospital resources updated successfully',
      hospital: {
        availableBeds: updatedHospital.available_beds,
        availableICUBeds: updatedHospital.available_icu_beds,
        availableVentilators: updatedHospital.available_ventilators,
        availableOxygenCylinders: updatedHospital.available_oxygen_cylinders
      }
    });
  } catch (error) {
    console.error('Error updating hospital resources:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}