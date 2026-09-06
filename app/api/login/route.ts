import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { sql } from '../../utils/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'resqbed_secret_key';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function POST(request: NextRequest) {
  console.log('Login API route hit');
  try {
    const body = await request.json();
    const { username, password, userType } = body;

    console.log(`Login attempt: ${username}, userType: ${userType || 'any'}`);

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const user = await sql`
      SELECT * FROM users WHERE username ILIKE ${username} LIMIT 1
    `.then(res => res[0]);

    if (!user) {
      console.log(`User not found: ${username}`);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (userType && user.user_type !== userType) {
      console.log(`User type mismatch. Expected: ${userType}, Found: ${user.user_type}`);
      return NextResponse.json(
        { message: `This account is not a ${userType} account. Please use the correct login page.` },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log(`Password verification failed for ${username}`);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.is_active) {
      console.log(`User ${username} is inactive`);
      return NextResponse.json(
        { message: 'Your account is inactive. Please contact support.' },
        { status: 403 }
      );
    }

    const token = await new SignJWT({
      userId: user.id,
      username: user.username,
      userType: user.user_type,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secretKey);

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
    };

    console.log(`Login successful for ${username}, userType: ${user.user_type}`);
    return NextResponse.json({
      user: mappedUser,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}