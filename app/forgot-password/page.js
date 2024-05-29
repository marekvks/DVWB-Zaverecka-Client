'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

import { Slide, toast } from "react-toastify";

import styles from '@/css/auth.module.css';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const sendCodeViaEmail = async (event) => {
        event.preventDefault();
    
        const email = event.target.email.value;

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refreshPasswordCode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        if (response.status === 200) {
            setEmail(email);
            event.target.email.value = '';
        }
    }

    const verifyCode = async (event) => {
        event.preventDefault();

        const code = event.target.code.value;

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/checkForgotPasswordCode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, refreshCode: code })
        });

        if (response.status === 200) {
            setCode(code);
            event.target.code.value = '';
        }
        else {
            const data = await response.json();
            toast.error(data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });
        }
    }

    const changePassword = async (event) => {
        event.preventDefault();

        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password !== confirmPassword) {
            toast.error('passwords don\'t match.', {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/updatePassword`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword, refreshCode: code})
        });

        if (response.status === 204) {
            toast.success('password changed.', {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });

            const loggedIn = await login(email, password);
            if (loggedIn) {
                router.push('/');
            }
        }
        else {
            const data = await response.json();
            toast.error(data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });
        }
    }

    if (code && code != '') {
        return (
            <main className={styles.main}>
                <form className={styles.form} onSubmit={changePassword}>
                    <h1 className={styles.longTitle}>New password</h1>
                    <div className={styles.inputContainer}>
                        <div className={styles.input}>
                            <label for="password">Password</label>
                            <input type="password" name="password" placeholder="password" />
                        </div>
                        <div className={styles.input}>
                            <label for="confirmnPassword">Confirm password</label>
                            <input type="password" name="confirmPassword" placeholder="password" />
                        </div>
                    </div>
                    <button type="submit">Change password</button>
                </form>
            </main>
        );
    }
    if (email && email != '') {
        return (
            <main className={styles.main}>
                <form className={styles.form} onSubmit={verifyCode}>
                    <h1 className={styles.longTitle}>Enter your code</h1>
                    <div className={styles.inputContainer}>
                        <div className={styles.input}>
                            <label for="code">Code</label>
                            <input type="text" name="code" placeholder="123456" />
                        </div>
                    </div>
                    <button type="submit">Send code</button>
                </form>
            </main>
        );
    }
    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={sendCodeViaEmail}>
                <h1 className={styles.longTitle}>Forgot password</h1>
                <div className={styles.inputContainer}>
                    <div className={styles.input}>
                        <label for="email">Email</label>
                        <input type="email" name="email" placeholder="example@example.com" />
                    </div>
                </div>
                <button type="submit">Send email</button>
            </form>
        </main>
    );
}
