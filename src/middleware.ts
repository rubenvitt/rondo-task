import { NextRequest, NextResponse } from 'next/server';
import { findAuthenticatedUserId } from '@/server/passage';
import logger from '@/utils/logging';
import redirectRelative from './utils/server';

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/app') ||
    request.nextUrl.pathname.startsWith('/setup-account')
  ) {
    const userId = await findAuthenticatedUserId(
      request.cookies.get('psg_auth_token')?.value
    );

    if (userId) {
      const headers: HeadersInit = {};
      headers['USER-ID'] = userId;

      logger.debug(`add user header with id ${userId}`);

      return NextResponse.next({
        headers,
      });
    }
    logger.debug('found no userId, redirecting to sign-in', userId);
    return redirectRelative(request, '/sign-in');
  }
  if (request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  logger.trace(
    "[Middleware]: I'm not handling pathname:",
    request.nextUrl.pathname
  );
}
