import { NextRequest, NextResponse } from 'next/server';

export function redirectRelative(request: NextRequest, pathName: string) {
  console.log(`redirecting to ${pathName}`);
  const url = request.nextUrl.clone();
  url.pathname = pathName;
  return NextResponse.redirect(url);
}
