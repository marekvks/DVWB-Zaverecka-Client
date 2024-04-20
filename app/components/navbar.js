'use client'

import Cookies from 'js-cookie';
import { getAccessToken } from '../lib/auth';
import { useEffect } from 'react';

import '../css/navbar.css';

const userData = async () => {
    const accessToken = await getAccessToken(Cookies);
    console.log(Cookies.get('accessToken'));
    console.log(accessToken);

    const response = await fetch('http://localhost:8080/auth/loggedIn', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    console.log(response.status);
}

export default function Navbar() {

    useEffect(() => {
        (async () => {
            const data = await userData();
        })();
    }, []);


    return (
        <header>
            <nav>
                <div className="scale-container">
                    <span className="logo">BlogPost</span>
                    <div className="links">
                        <div className="default-links">
                            <a href="#">about</a>
                            <a href="#">support</a>
                        </div>
                        <a className="login-link" href="/login">Login</a>
                    </div>
                </div>
            </nav>
        </header>
    )
}