import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { sql } from '../../utils/supabase';
import { supabaseStorage } from '../../utils/supabaseStorage';

const JWT_SECRET = process.env.JWT_SECRET || 'resqbed_secret_key';
const secretKey = new TextEncoder().encode(JWT_SECRET);

async function verifyToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as { userId: string; username: string; userType: string; };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const decoded = await verifyToken(authHeader);

    if (!decoded) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!['hospital', 'doctor'].includes(decoded.userType)) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    let referrals;

    if (decoded.userType === 'hospital') {
      // Only referrals sent TO this hospital
      referrals = await sql`
        SELECT r.*, u.id as doc_id, u.first_name as doc_first, u.last_name as doc_last, u.hospital_name as doc_hospital, u.employee_code as doc_emp
        FROM referrals r
        LEFT JOIN users u ON r.referring_doctor_id = u.id
        WHERE r.target_hospital_id = ${decoded.userId}
      `;
    } else {
      // Only referrals made BY this doctor — also joins the target hospital's
      // own details (name, address, contact number) so the doctor can print
      // a referral slip with the receiving hospital's contact info.
      referrals = await sql`
        SELECT r.*, u.id as doc_id, u.first_name as doc_first, u.last_name as doc_last, u.hospital_name as doc_hospital, u.employee_code as doc_emp,
          h.hospital_name as hosp_name, h.address as hosp_address, h.contact_number as hosp_contact
        FROM referrals r
        LEFT JOIN users u ON r.referring_doctor_id = u.id
        LEFT JOIN hospitals h ON r.target_hospital_id = h.id
        WHERE r.referring_doctor_id = ${decoded.userId}
      `;
    }

    const mapped = referrals.map((r: any) => {
      return {
        id: r.id,
        patientName: r.patient_name,
        patientAge: r.patient_age,
        patientGender: r.patient_gender,
        patientPhone: r.patient_phone,
        patientAddress: r.patient_address,
        medicalHistory: r.medical_history,
        referralReason: r.referral_reason,
        prescriptionUrl: r.prescription_url,
        status: r.status,
        createdAt: r.created_at,
        referringDoctor: r.doc_id ? {
          id: r.doc_id,
          firstName: r.doc_first,
          lastName: r.doc_last,
          hospitalName: r.doc_hospital,
          employeeCode: r.doc_emp
        } : null,
        targetHospital: r.hosp_name ? {
          hospitalName: r.hosp_name,
          address: r.hosp_address,
          contactNumber: r.hosp_contact,
        } : null
      };
    });

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const decoded = await verifyToken(authHeader);

    if (!decoded || decoded.userType !== 'doctor') {
      return NextResponse.json({ message: 'Unauthorized, only doctors can refer' }, { status: 401 });
    }

    const formData = await request.formData();

    // Convert formData fields
    const patientName = formData.get('patientName') as string;
    const patientAge = formData.get('patientAge') as string;
    const patientGender = formData.get('patientGender') as string;
    const patientPhone = formData.get('patientPhone') as string;
    const patientAddress = formData.get('patientAddress') as string;
    const medicalHistory = formData.get('medicalHistory') as string;
    const referralReason = formData.get('referralReason') as string;
    const referralHospital = formData.get('referralHospital') as string;
    const prescriptionFile = formData.get('prescription') as File | null;
    const submittedEmployeeCode = formData.get('employeeCode') as string;

    if (!patientPhone || !patientPhone.trim()) {
      return NextResponse.json({ message: 'Patient phone number is required' }, { status: 400 });
    }

    if (!patientAddress || !patientAddress.trim()) {
      return NextResponse.json({ message: 'Patient address is required' }, { status: 400 });
    }

    // --- Employee code validation ---
    if (!submittedEmployeeCode || !submittedEmployeeCode.trim()) {
      return NextResponse.json({ message: 'Employee code is required' }, { status: 400 });
    }

    const doctor = await sql`
      SELECT employee_code FROM users WHERE id = ${decoded.userId} LIMIT 1
    `.then(res => res[0]);

    if (!doctor) {
      return NextResponse.json({ message: 'Doctor not found' }, { status: 404 });
    }

    if (doctor.employee_code.toLowerCase() !== submittedEmployeeCode.trim().toLowerCase()) {
      return NextResponse.json({ message: 'Invalid employee code. Please enter your correct employee code.' }, { status: 403 });
    }
    // --- End validation ---

    let prescriptionUrl = '';

    if (prescriptionFile && prescriptionFile.name) {
      const bytes = await prescriptionFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileExtension = prescriptionFile.name.split('.').pop() || 'png';
      const fileName = `prescription_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;

      const { error: uploadError } = await supabaseStorage.storage
        .from('prescriptions')
        .upload(fileName, buffer, {
          contentType: prescriptionFile.type || 'application/octet-stream',
        });

      if (uploadError) {
        console.error('Prescription upload error:', uploadError);
        return NextResponse.json({ message: 'Failed to upload prescription file' }, { status: 500 });
      }

      const { data: publicUrlData } = supabaseStorage.storage
        .from('prescriptions')
        .getPublicUrl(fileName);

      prescriptionUrl = publicUrlData.publicUrl;
    }

    try {
      const data = await sql`
        INSERT INTO referrals (
          patient_name,
          patient_age,
          patient_gender,
          patient_phone,
          patient_address,
          medical_history,
          referral_reason,
          prescription_url,
          target_hospital_id,
          referring_doctor_id,
          status
        ) VALUES (
          ${patientName},
          ${patientAge},
          ${patientGender},
          ${patientPhone},
          ${patientAddress},
          ${medicalHistory},
          ${referralReason},
          ${prescriptionUrl},
          ${referralHospital || null},
          ${decoded.userId},
          'pending'
        )
        RETURNING *
      `.then(res => res[0]);

      return NextResponse.json({ message: 'Referral created successfullly', referral: data });
    } catch (error) {
      console.error('Postgres insert error details:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('Full caught error in referrals POST:', error);
    return NextResponse.json({ message: error.message || 'Internal server error' }, { status: 500 });
  }
}