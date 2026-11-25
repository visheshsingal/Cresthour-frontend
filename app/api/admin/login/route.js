import { NextResponse } from 'next/server';
import { getAdminCredentials, createAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const creds = getAdminCredentials();

    if (username === creds.username && password === creds.password) {
      const token = createAdminToken(username, password);
      const response = NextResponse.json({ success: true, message: 'Logged in successfully' });

      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid username or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
