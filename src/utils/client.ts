import { cookies, headers } from 'next/headers';

export function authCookie() {
  return cookies().get('psg_auth_token');
}

export function userIdFromHeader() {
  return headers().get('USER-ID')!!;
}
