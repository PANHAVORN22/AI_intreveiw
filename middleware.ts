import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'interviewai_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public/static files (e.g. /logo.png, /PLATFORM_GUIDE.md)
  if (pathname.includes('.')) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  // Allow auth pages; if already logged in, redirect away from them.
  if (pathname.startsWith('/auth')) {
    if (session) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      url.search = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Everything else requires a session.
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
