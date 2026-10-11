import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    const authCookie = request.cookies.get('admin_token');
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedPassword) {
      console.error("ADMIN_PASSWORD environment variable is not set.");
      // In development, if no password is set, we might want to block access to be safe,
      // or redirect to login.
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    if (!authCookie || authCookie.value !== expectedPassword) {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
