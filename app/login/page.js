'use client';

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export const login = async (email, password) => {
    const reqBody = { email: email, password: password }

    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(reqBody)
    });

    if (response.status === 200) {
        const data = await response.json();
        const accessToken = data.accessToken;
        sessionStorage.setItem('accessToken', accessToken);
        return true;
    }
    return false;
}

export const isLoggedIn = async () => {
  const accessToken = sessionStorage.getItem('accessToken');

  if (!accessToken)
      return false;

  const response = await fetch('http://localhost:8080/auth/loggedIn', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
  });

  if (response.status == 200)
      return true;

  return false;
}

export default function Login() {
    const router = useRouter();

    useLayoutEffect(() => {
      let loggedIn = false;
      (async () => {
        loggedIn = await isLoggedIn();
        if (loggedIn)
          router.push('/');
      })();
    });

  return (
    <main>
        LOGIN!!!
    </main>
  );
}
