'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../lib/auth";

import { Slide, toast } from "react-toastify";

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
            toast.success('Email sent', {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });
            setEmail(email);
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
        }
    }

    const changePassword = async (event) => {
        event.preventDefault();

        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.'); // replace with toaster
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
            alert('Password changed!'); // replace with toaster
            const loggedIn = await login(email, password);

            if (loggedIn)
                router.push('/');
        }
    }

    if (code && code != '') {
        return (
            <main>
                <form onSubmit={changePassword}>
                    <h1>Enter a new password</h1>
                    <label for="password">Password</label>
                    <input type="password" name="password" />
                    <label for="confirmnPassword">Confirm password</label>
                    <input type="password" name="confirmPassword" />
                    <button type="submit">Change password</button>
                </form>
            </main>
        );
    }
    if (email && email != '') {
        return (
            <main>
                <form onSubmit={verifyCode}>
                    <h1>Enter your code</h1>
                    <input type="text" name="code" />
                    <button type="submit">Send code</button>
                </form>
            </main>
        );
    }
    return (
        <main>
            <form onSubmit={sendCodeViaEmail}>
                <h1>Forgot password</h1>
                <input type="email" name="email" />
                <button type="submit">Send email</button>
            </form>
        </main>
    );
}
