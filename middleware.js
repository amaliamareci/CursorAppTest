import { NextResponse } from 'next/server';

export function middleware(request) {
  // Only check cookies, not localStorage
  const hasUserCookie = request.cookies.has('user');

  if (!hasUserCookie && request.nextUrl.pathname.startsWith('/dashboards')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboards/:path*']
}; 