import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { sql } from '../../../utils/supabase';
export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'resqbed_secret_key';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function GET(request: NextRequest) {
  console.log('Validate API route hit');
  try {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header missing or invalid' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const { payload } = await jwtVerify(token, secretKey);
      const decoded = payload as {
        userId: string;
        username: string;
        userType: string;
      };

      const user = await sql`
        SELECT * FROM users WHERE id = ${decoded.userId} LIMIT 1
      `.then(res => res[0]);


      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }

      if (!user.is_active) {
        return NextResponse.json(
          { message: 'User account is inactive' },
          { status: 403 }
        );
      }

      const mappedUser = {
        id: user.id,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
        isActive: user.is_active,
        hospitalName: user.hospital_name,
        employeeCode: user.employee_code,
        profilePhotoUrl: user.profile_photo_url,
        createdAt: user.created_at,
      };

      return NextResponse.json({
        user: mappedUser,
      });
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}