'use client';

import { useRouter } from 'next/navigation';
import { login } from "../lib/auth";

import { Slide, toast } from "react-toastify";
import Link from "next/link";

import styles from '@/css/auth.module.css';

export default function Login() {
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
    
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        const { loggedIn, data } = await login(email, password);
        if (loggedIn)
            router.push('/');
        else {
            toast.error(data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });
        }
    }

    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className={styles.inputContainer}>
                    <div className={styles.input}>
                        <label htmlFor="email">email</label>
                        <input type="email" name="email" placeholder="example@example.com" />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" placeholder="password" />
                    </div>
                </div>
                <Link href="/forgot-password" className="normal-link">Forgot password?</Link>
                <span>Don't have an account? Register <Link href="/register" className="normal-link">here</Link>.</span>
                <button type="submit">Login</button>
            </form>
        </main>
    );
}
