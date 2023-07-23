import { cookies } from 'next/headers'

export function authCookie() {
    return cookies().get('psg_auth_token')
}