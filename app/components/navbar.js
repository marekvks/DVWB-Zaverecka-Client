'use client'

import Cookies from 'js-cookie';
import { getAccessToken, logout } from '@/lib/auth';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    const [img, setImg] = useState();

    useEffect(() => {
        (async () => {
            const data = await userData();
            if (!data)
                return;

            const currentUser = {
                username: data.username,
                id: data.id_user
            }

            setUser(currentUser);

            const accessToken = await getAccessToken(Cookies);

            const pfp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/@me/avatar`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const img = await pfp.blob();
            const imgSrc = URL.createObjectURL(img);
            setImg(imgSrc);
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
                                <Image src={img} width="40" height="40" className="rounded-full"></Image>
                                <div className={styles.dropdown}>
                                    <a className={styles.username}>{user.username}</a>
                                    <div className={styles.dropdownContent}>
                                        <a className="normal-link" href={`/user/${user.username}`}>Edit profile</a>
                                        <a className="normal-link" href="/createBlogPost">Create post</a>
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