import { NextRequest, NextResponse } from 'next/server';
import logger from '@/utils/logging';

export default function redirectRelative(
  request: NextRequest,
  pathName: string
) {
  logger.trace(`redirecting to ${pathName}`);
  const url = request.nextUrl.clone();
  url.pathname = pathName;
  return NextResponse.redirect(url);
}
