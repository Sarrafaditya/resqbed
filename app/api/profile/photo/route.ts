import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { sql } from '../../../utils/supabase';
import { supabaseStorage } from '../../../utils/supabaseStorage';

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

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const decoded = await verifyToken(authHeader);

    if (!decoded) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const photo = formData.get('photo') as File | null;

    if (!photo || !photo.name) {
      return NextResponse.json({ message: 'A photo file is required' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(photo.type)) {
      return NextResponse.json(
        { message: 'Unsupported file type. Please upload a JPG, PNG, WEBP, or HEIC image.' },
        { status: 400 }
      );
    }

    if (photo.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ message: 'File is too large. Maximum size is 5MB.' }, { status: 400 });
    }

    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileExtension = photo.name.split('.').pop() || 'jpg';
    const fileName = `profile_${decoded.userId}_${Date.now()}.${fileExtension}`;

    const { error: uploadError } = await supabaseStorage.storage
      .from('profile-photos')
      .upload(fileName, buffer, {
        contentType: photo.type,
      });

    if (uploadError) {
      console.error('Profile photo upload error:', uploadError);
      return NextResponse.json({ message: 'Failed to upload photo' }, { status: 500 });
    }

    const { data: publicUrlData } = supabaseStorage.storage
      .from('profile-photos')
      .getPublicUrl(fileName);

    const profilePhotoUrl = publicUrlData.publicUrl;

    const updated = await sql`
      UPDATE users SET profile_photo_url = ${profilePhotoUrl} WHERE id = ${decoded.userId}
      RETURNING *
    `.then(res => res[0]);

    if (!updated) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const mappedUser = {
      id: updated.id,
      username: updated.username,
      firstName: updated.first_name,
      lastName: updated.last_name,
      userType: updated.user_type,
      isActive: updated.is_active,
      hospitalName: updated.hospital_name,
      employeeCode: updated.employee_code,
      profilePhotoUrl: updated.profile_photo_url,
      createdAt: updated.created_at,
    };

    return NextResponse.json({ message: 'Profile photo updated', user: mappedUser });
  } catch (error) {
    console.error('Error updating profile photo:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}