'use client';

import { useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { isLoggedIn } from "../lib/auth";

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

export default function Login() {
    const router = useRouter();

    const [render, setRender] = useState(false);

    useLayoutEffect(() => {
      let loggedIn = true;
      (async () => {
        loggedIn = await isLoggedIn();
        console.log(loggedIn);
        if (loggedIn)
          router.push('/');
          return <></>;
      })();
      if (!loggedIn)
          setRender(true);
  });

  if (!render)
        return null;

  return (
    <main>
        LOGIN!!!
    </main>
  );
}
