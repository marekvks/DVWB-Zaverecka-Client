'use client';

import { useRouter } from "next/navigation";
import { login, register } from "../lib/auth.js";

import styles from '@/css/auth.module.css';

export default function Register() {
    const router = useRouter();

    const registerUser = async (event) => {
        event.preventDefault();
    
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        const registered = await register(username, email, password);
    
        if (!registered)
            return;

        const loggedIn = await login(email, password);
        if (loggedIn)
            router.push('/');
    }

    return (
    <main className={styles.main}>
        <form className={styles.form} onSubmit={registerUser}>
            <h1>Register</h1>
            <div className={styles.inputContainer}>
                <div className={styles.input}>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" placeholder="username" />
                </div>
                <div className={styles.input}>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" placeholder="example@example.com" />
                </div>
                <div className={styles.input}>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" placeholder="password" />
                </div>
            </div>
            <button type="submit">Register</button>
        </form>
    </main>
    );
}