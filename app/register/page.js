'use client';

import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { login } from "../login/page";
import { isLoggedIn } from "../lib/auth.js";
import '../css/auth.css';

export default function Register() {
    const router = useRouter();

    const [render, setRender] = useState(false);

    useLayoutEffect(() => {
        let loggedIn = false;
        (async () => {
          loggedIn = await isLoggedIn();
          console.log(loggedIn);
          if (loggedIn) {
            router.push('/');
            return <></>;
          }
        })();
        if (!loggedIn)
            setRender(true);
    });

    console.log(render);
    if (!render)
        return null;

    const registerUser = async (event) => {
        event.preventDefault();
    
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        const reqBody = { username: username, email: email, password: password };
    
        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(reqBody)
        });
    
        if (response.status === 201) {
            const loggedIn = await login(email, password, '/');
            if (loggedIn)
                router.push('/');
        }
    }

    return (
    <main>
        <form onSubmit={registerUser}>
            <label htmlFor="username">username</label>
            <input type="text" name="username" placeholder="username" />
            <label htmlFor="email">email</label>
            <input type="text" name="email" placeholder="email" />
            <label htmlFor="password">password</label>
            <input type="password" name="password" placeholder="password" />
            <button type="submit">Submit</button>
        </form>
    </main>
    );
}