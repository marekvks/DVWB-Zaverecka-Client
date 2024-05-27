import { NextResponse } from 'next/server';
import { isLoggedIn, checkRefreshToken } from './app/lib/auth';

const routesRedirectedToHomePage = ['/login', '/register', '/forgot-password'];
const routesRedirectedToLogin = ['/userData', '/blogpost'];

export async function middleware(request) {
  let response = NextResponse.next();

  // Loads a page
  if (request.nextUrl.pathname.endsWith('/page.js')) {
    // check refresh token
    await checkRefreshToken(request, response);
  }
  // API request
  else if (request.nextUrl.pathname.startsWith('/api')) {
    console.log('api');
  }

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
}