import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { sql } from '../../utils/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'resqbed_secret_key';
const secretKey = new TextEncoder().encode(JWT_SECRET);

async function verifyToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as { userId: string; username: string; userType: string };
  } catch {
    return null;
  }
}

const FIELD_MAP: Record<string, string> = {
  'A+': 'a_positive',
  'A-': 'a_negative',
  'B+': 'b_positive',
  'B-': 'b_negative',
  'AB+': 'ab_positive',
  'AB-': 'ab_negative',
  'O+': 'o_positive',
  'O-': 'o_negative',
};

// Public — no auth. Anyone (doctors, hospitals, or an unauthenticated visitor)
// can view live blood availability across all registered hospitals.
export async function GET() {
  try {
    const rows = await sql`
      SELECT
        h.id as hospital_id,
        h.hospital_name,
        h.hospital_type,
        h.address,
        b.a_positive,
        b.a_negative,
        b.b_positive,
        b.b_negative,
        b.ab_positive,
        b.ab_negative,
        b.o_positive,
        b.o_negative,
        b.updated_at
      FROM hospitals h
      JOIN users u ON u.id = h.id
      LEFT JOIN blood_inventory b ON b.hospital_id = h.id
      WHERE u.is_active = true
      ORDER BY h.hospital_name ASC
    `;

    const mapped = rows.map((r) => ({
      hospitalId: r.hospital_id,
      hospitalName: r.hospital_name,
      hospitalType: r.hospital_type,
      address: r.address,
      bloodUnits: {
        'A+': r.a_positive ?? 0,
        'A-': r.a_negative ?? 0,
        'B+': r.b_positive ?? 0,
        'B-': r.b_negative ?? 0,
        'AB+': r.ab_positive ?? 0,
        'AB-': r.ab_negative ?? 0,
        'O+': r.o_positive ?? 0,
        'O-': r.o_negative ?? 0,
      },
      updatedAt: r.updated_at,
    }));

    return NextResponse.json({ hospitals: mapped });
  } catch (error) {
    console.error('Error fetching blood availability:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Hospital-only — updates the logged-in hospital's own inventory.
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const decoded = await verifyToken(authHeader);

    if (!decoded) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (decoded.userType !== 'hospital') {
      return NextResponse.json({ message: 'Only hospitals can update blood inventory' }, { status: 403 });
    }

    const body = await request.json();
    const bloodUnits = body.bloodUnits as Record<string, number>;

    if (!bloodUnits || typeof bloodUnits !== 'object') {
      return NextResponse.json({ message: 'bloodUnits object is required' }, { status: 400 });
    }

    for (const [group, value] of Object.entries(bloodUnits)) {
      if (!(group in FIELD_MAP)) {
        return NextResponse.json({ message: `Unknown blood group: ${group}` }, { status: 400 });
      }
      if (typeof value !== 'number' || isNaN(value) || value < 0) {
        return NextResponse.json({ message: `Invalid unit count for ${group}` }, { status: 400 });
      }
    }

    const aPos = bloodUnits['A+'] ?? 0;
    const aNeg = bloodUnits['A-'] ?? 0;
    const bPos = bloodUnits['B+'] ?? 0;
    const bNeg = bloodUnits['B-'] ?? 0;
    const abPos = bloodUnits['AB+'] ?? 0;
    const abNeg = bloodUnits['AB-'] ?? 0;
    const oPos = bloodUnits['O+'] ?? 0;
    const oNeg = bloodUnits['O-'] ?? 0;

    const updated = await sql`
      INSERT INTO blood_inventory (
        hospital_id, a_positive, a_negative, b_positive, b_negative,
        ab_positive, ab_negative, o_positive, o_negative
      ) VALUES (
        ${decoded.userId}, ${aPos}, ${aNeg}, ${bPos}, ${bNeg},
        ${abPos}, ${abNeg}, ${oPos}, ${oNeg}
      )
      ON CONFLICT (hospital_id) DO UPDATE SET
        a_positive = EXCLUDED.a_positive,
        a_negative = EXCLUDED.a_negative,
        b_positive = EXCLUDED.b_positive,
        b_negative = EXCLUDED.b_negative,
        ab_positive = EXCLUDED.ab_positive,
        ab_negative = EXCLUDED.ab_negative,
        o_positive = EXCLUDED.o_positive,
        o_negative = EXCLUDED.o_negative
      RETURNING *
    `.then(res => res[0]);

    return NextResponse.json({
      message: 'Blood inventory updated successfully',
      bloodUnits: {
        'A+': updated.a_positive,
        'A-': updated.a_negative,
        'B+': updated.b_positive,
        'B-': updated.b_negative,
        'AB+': updated.ab_positive,
        'AB-': updated.ab_negative,
        'O+': updated.o_positive,
        'O-': updated.o_negative,
      },
      updatedAt: updated.updated_at,
    });
  } catch (error) {
    console.error('Error updating blood inventory:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}