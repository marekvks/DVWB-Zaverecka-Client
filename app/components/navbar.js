'use client'

import Cookies from 'js-cookie';
import { getAccessToken, logout } from '@/lib/auth';
import { useLayoutEffect, useState } from 'react';

import styles from '@/css/navbar.module.css';

const userData = async () => {
    const accessToken = await getAccessToken(Cookies);

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/@me`, {
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

    const handleLogout = async () => {
        await logout();
    }

    if (!user.username) {
        return (
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.scaleContainer}>
                        <span className={styles.logo}>BlogPost</span>
                        <div className={styles.links}>
                            <div className={styles.defaultLinks}>
                                <a href="#">about</a>
                                <a href="#">support</a>
                            </div>
                            <a className={styles.loginLink} href="/login">Login</a>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

    return (
        <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.scaleContainer}>
                        <span className={styles.logo}>BlogPost</span>
                        <div className={styles.links}>
                            <div className={styles.defaultLinks}>
                                <a href="#">about</a>
                                <a href="#">support</a>
                            </div>
                            <div className={styles.userData}>
                                <div className={styles.dropdown}>
                                    <a className={styles.username}>{user.username}</a>
                                    <div className={styles.dropdownContent}>
                                        <a className="normal-link" href="/userData">Edit profile</a>
                                        <a className="normal-link" href="/blogPostEditor">Create post</a>
                                        <button onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
    )
}