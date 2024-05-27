'use client'

import Cookies from 'js-cookie';
import { getAccessToken } from '../lib/auth';
import { useLayoutEffect, useState } from 'react';

import '../css/navbar.css';

const userData = async () => {
    const accessToken = await getAccessToken(Cookies);

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/getUser`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.status != 200)
        return null;

    const data = await response.json();

    if (data)
        return data;

    return null;
}

export default function Navbar() {
    const [user, setUser] = useState({});

    useLayoutEffect(() => {
        (async () => {
            const data = await userData();
            if (!data)
                return;

            const currentUser = {
                username: data.username
            }

            setUser(currentUser)
        })();
    }, []);


    if (!user.username) {
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
        );
    }

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
                            <div className="user-data">
                                <a className="username" href="/userData">{user.username}</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
    )
}