import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  if (accessToken || refreshToken) {
    return NextResponse.redirect(new URL('/main', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/account/login', '/account/sign-up', '/account/find-password'],
};
