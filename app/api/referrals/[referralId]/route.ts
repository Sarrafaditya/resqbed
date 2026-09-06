import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { sql } from '../../../utils/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'tap2bed_secret_key';
const secretKey = new TextEncoder().encode(JWT_SECRET);

async function verifyToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as { userId: string; username: string; userType: string; };
  } catch {
    return null;
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { referralId: string } }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    const decoded = await verifyToken(authHeader);

    if (!decoded) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (decoded.userType !== 'hospital') {
      return NextResponse.json({ message: 'Only hospitals can update referral status' }, { status: 403 });
    }

    const { referralId } = params;
    const body = await request.json();
    const { status } = body;

    if (!['pending', 'accepted', 'rejected', 'completed'].includes(status)) {
      return NextResponse.json({ message: 'Invalid status value' }, { status: 400 });
    }

    const referral = await sql`
      UPDATE referrals SET status = ${status} WHERE id = ${referralId} RETURNING *
    `.then(res => res[0]);

    if (!referral) {
      return NextResponse.json({ message: 'Referral not found or could not update' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Referral status updated successfully',
      referral
    });
  } catch (error) {
    console.error('Error updating referral status:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { referralId: string } }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    const decoded = await verifyToken(authHeader);
    if (!decoded) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { referralId } = params;
    const referral = await sql`
      SELECT r.*, u.id as doc_id, u.first_name as doc_first, u.last_name as doc_last, u.hospital_name as doc_hospital, u.employee_code as doc_emp
      FROM referrals r
      LEFT JOIN users u ON r.referring_doctor_id = u.id
      WHERE r.id = ${referralId}
      LIMIT 1
    `.then(res => res[0]);

    if (!referral) {
      return NextResponse.json({ message: 'Referral not found' }, { status: 404 });
    }

    const mapped = {
      id: referral.id,
      patientName: referral.patient_name,
      patientAge: referral.patient_age,
      patientGender: referral.patient_gender,
      medicalHistory: referral.medical_history,
      referralReason: referral.referral_reason,
      prescriptionUrl: referral.prescription_url,
      status: referral.status,
      createdAt: referral.created_at,
      referringDoctor: referral.doc_id ? {
        id: referral.doc_id,
        firstName: referral.doc_first,
        lastName: referral.doc_last,
        hospitalName: referral.doc_hospital,
        employeeCode: referral.doc_emp
      } : null
    };

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Error fetching referral:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
