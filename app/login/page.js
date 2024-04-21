'use client';

import { useRouter } from "next/navigation";
import { login } from "../lib/auth";

import '../css/auth.css';

export default function Login() {
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
    
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        const loggedIn = await login(email, password);
        if (loggedIn)
            router.push('/');
    }

    return (
        <main>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-container">
                    <div className="input">
                        <label htmlFor="email">email</label>
                        <input type="email" name="email" placeholder="example@example.com" />
                    </div>
                    <div className="input">
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" placeholder="password" />
                    </div>
                </div>
                <button type="submit">Login</button>
            </form>
        </main>
    );
}
