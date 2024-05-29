'use client';

import { useRouter } from "next/navigation";
import { login, register } from "../lib/auth.js";

import { Slide, toast } from "react-toastify";
import styles from '@/css/auth.module.css';

export default function Register() {
    const router = useRouter();

    const registerUser = async (event) => {
        event.preventDefault();
    
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        const registerInfo = await register(username, email, password);
    
        if (!registerInfo.registered) {
            toast.error(registerInfo.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });
            return;
        }

        const loginInfo = await login(email, password);
        if (loginInfo.loggedIn)
            router.push('/');
        else {
            toast.error(loginInfo.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });
        }
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
            <span>Already have an account? Log-in <a href="/login" className="normal-link">here</a>.</span>
            <button type="submit">Register</button>
        </form>
    </main>
    );
}