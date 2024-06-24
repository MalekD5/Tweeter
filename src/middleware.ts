import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  if (req.nextUrl.pathname === '/api/signup') {
    return NextResponse.next();
  }

  const { auth } = req;
  if (!auth.user.username) {
    return NextResponse.redirect(new URL('/complete-signup', req.nextUrl.origin));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|logo.svg|complete-signup|$).*)'],
};
