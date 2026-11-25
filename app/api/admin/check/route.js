import { NextResponse } from 'next/server';
import { verifyAdminSession, getAdminCredentials } from '@/lib/auth';

export async function GET() {
  const isAuth = verifyAdminSession();
  const { username } = getAdminCredentials();
  return NextResponse.json({
    authenticated: isAuth,
    user: isAuth ? { username } : null
  });
}
