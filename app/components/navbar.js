'use client'

import Cookies from 'js-cookie';
import { getAccessToken, logout } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from "next/link";

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

export default function Navbar({ search = false }) {
    const router = useRouter();

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
        const loggedOut = await logout();

        window.location.reload();
    }

    return (
        <header className="flex justify-center w-full h-20">
                <nav className="flex flex-row justify-center w-4/5 border-b border-solid border-grey">
                    <div className="flex flex-row justify-between items-center w-10/12">
                        <Link href="/" className="text-3xl transition-all hover:text-greenBright">BlogPost</Link>
                        <div className="flex flex-row justify-center items-center w-8/12">
                            {!search &&
                                <div className="flex flex-row gap-20 ml-72">
                                    <Link href="/about" className="text-2xl transition-all hover:text-greyText">about</Link>
                                    <Link href="/support" className="text-2xl transition-all hover:text-greyText">support</Link>
                                </div>
                            }
                            {search &&
                                <form className="flex flex-row items-center gap-0">
                                    <input type="text" className="w-96 h-12 border border-r-0 border-solid rounded-l-lg rounded-r-none border-grey" />
                                    <button className="w-28 h-12 text-white text-xl rounded-r-xl rounded-l-none hover:bg-greenDark transition-all">Search</button>
                                </form>
                            }
                            {!user.username &&
                                <Link className="ml-auto px-8 py-2 text-2xl border border-solid border-greenBright rounded-full text-greenBright transition-all hover:bg-greenBright hover:text-blackBackground" href="/login">Login</Link>
                            }
                            {user.username &&
                                <div className="flex flex-row items-center gap-4 ml-auto">
                                    <Image src={img} width="40" height="40" className="rounded-full min-w-12 min-h-12 h-12 w-12 border border-solid border-greenBright" unoptimized />
                                    <div className={styles.dropdown}>
                                        <Link href={`/user/${user.username}`} className="text-xl">{user.username}</Link>
                                        <div className={styles.dropdownContent}>
                                            <Link className="normal-link" href={`/user/${user.username}`}>Edit profile</Link>
                                            <Link className="normal-link" href="/createBlogPost">Create post</Link>
                                            <button onClick={handleLogout}>Logout</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </nav>
            </header>
    )
}