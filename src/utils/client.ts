import { cookies } from 'next/headers';

export default function authCookie() {
  return cookies().get('psg_auth_token');
}
