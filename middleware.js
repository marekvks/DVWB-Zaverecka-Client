import { NextRequest, NextResponse } from 'next/server';
import { isLoggedIn } from './app/lib/auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  if (request.nextUrl.pathname === '/login') {
    const loggedIn = await isLoggedIn(request.cookies.get('accessToken'), request.cookies.get('refreshToken'));
    console.log(loggedIn);
    if (loggedIn)
      return NextResponse.redirect(new URL('/', request.url));
  }
}