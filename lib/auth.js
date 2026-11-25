import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'cresthour_admin_session';

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'cresthour@admin123';
  return { username, password };
}

export function verifyAdminSession() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return false;

    // Expected token format: base64(username:secret)
    const { username, password } = getAdminCredentials();
    const expected = Buffer.from(`${username}:${password}`).toString('base64');
    return token === expected;
  } catch (error) {
    return false;
  }
}

export function createAdminToken(username, password) {
  return Buffer.from(`${username}:${password}`).toString('base64');
}

export { ADMIN_COOKIE_NAME };
