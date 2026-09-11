import { NextResponse } from 'next/server';
import { sql } from '../../utils/supabase';

// Ensures this route always runs fresh on every request instead of being
// statically cached at build/deploy time (it has no dynamic request data,
// so Next.js would otherwise be tempted to cache it).
export const dynamic = 'force-dynamic';

// Public endpoint — no auth. Returns aggregate stats plus a per-hospital
// breakdown, for the unauthenticated stats screen.
export async function GET() {
  try {
    const hospitals = await sql`
      SELECT
        h.id,
        h.hospital_name,
        h.hospital_type,
        h.address,
        h.total_beds,
        h.available_beds,
        h.total_icu_beds,
        h.available_icu_beds,
        h.total_ventilators,
        h.available_ventilators,
        h.oxygen_cylinders,
        h.available_oxygen_cylinders,
        h.updated_at
      FROM hospitals h
      JOIN users u ON u.id = h.id
      WHERE u.is_active = true
      ORDER BY h.hospital_name ASC
    `;

    const totals = hospitals.reduce(
      (acc, h) => {
        acc.totalHospitals += 1;
        acc.totalBeds += h.total_beds || 0;
        acc.availableBeds += h.available_beds || 0;
        acc.totalICUBeds += h.total_icu_beds || 0;
        acc.availableICUBeds += h.available_icu_beds || 0;
        acc.totalVentilators += h.total_ventilators || 0;
        acc.availableVentilators += h.available_ventilators || 0;
        acc.totalOxygenCylinders += h.oxygen_cylinders || 0;
        acc.availableOxygenCylinders += h.available_oxygen_cylinders || 0;
        return acc;
      },
      {
        totalHospitals: 0,
        totalBeds: 0,
        availableBeds: 0,
        totalICUBeds: 0,
        availableICUBeds: 0,
        totalVentilators: 0,
        availableVentilators: 0,
        totalOxygenCylinders: 0,
        availableOxygenCylinders: 0,
      }
    );

    const mappedHospitals = hospitals.map((h) => ({
      id: h.id,
      hospitalName: h.hospital_name,
      hospitalType: h.hospital_type,
      address: h.address,
      totalBeds: h.total_beds,
      availableBeds: h.available_beds,
      totalICUBeds: h.total_icu_beds,
      availableICUBeds: h.available_icu_beds,
      totalVentilators: h.total_ventilators,
      availableVentilators: h.available_ventilators,
      totalOxygenCylinders: h.oxygen_cylinders,
      availableOxygenCylinders: h.available_oxygen_cylinders,
      updatedAt: h.updated_at,
    }));

    return NextResponse.json({
      totals,
      hospitals: mappedHospitals,
    });
  } catch (error) {
    console.error('Error fetching public stats:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}