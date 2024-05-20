import { NextResponse } from 'next/server';
import { isLoggedIn, checkRefreshToken } from './app/lib/auth';

const routesRedirectedToHomePage = ['/login', '/register'];
const routesRedirectedToLogin = ['/userData', '/blogpost'];

export async function middleware(request) {
  let response = NextResponse.next();

  // check refresh token
  await checkRefreshToken(request, response);

  const nextPath = request.nextUrl.pathname;

  if (routesRedirectedToHomePage.includes(nextPath)) {
    const loggedIn = await isLoggedIn(request, response);
    if (loggedIn) {  
      response = NextResponse.redirect(new URL('/', request.url));
      return response;
    }
  }
  else if (routesRedirectedToLogin.includes(nextPath)) {
    const loggedIn = await isLoggedIn(request, response);
    if (!loggedIn) {
      response = NextResponse.redirect(new URL('/login', request.url));
      return response;
    }
  }

  return response;
}