import { NextResponse } from 'next/server';
import { isLoggedIn } from './app/lib/auth';

const routesRedirectedToHomePage = ['/login', '/register'];
const routesRedirectedToLogin = ['/userData', '/blogpost'];

export async function middleware(request) {
  let response = NextResponse.next();
  const nextPath = request.nextUrl.pathname;

  if (routesRedirectedToHomePage.includes(nextPath)) {
    response = NextResponse.redirect(new URL('/', request.url));

    const loggedIn = await isLoggedIn(request, response);
    if (loggedIn)
      return response;
  }
  else if (routesRedirectedToLogin.includes(nextPath)) {
    response = NextResponse.redirect(new URL('/login', request.url));

    const loggedIn = await isLoggedIn(request, response);
    if (!loggedIn)
      return response;
  }
}