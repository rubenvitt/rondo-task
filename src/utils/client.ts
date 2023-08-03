import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export function authCookie() {
  return cookies().get('psg_auth_token');
}

export function userIdFromHeader() {
  const userId = headers().get('USER-ID');
  if (userId === null) {
    redirect('/sign-in');
  }
  return userId;
}
