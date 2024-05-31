'use client'

import Cookies from 'js-cookie';
import { getAccessToken } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Navbar from '@/components/navbar';
import Link from "next/link";

import { login } from '@/lib/auth';

import { Slide, toast } from 'react-toastify';
import BlogPostCard from '@/components/blogpostCard';
import FollowedUser from '@/components/followedUser';


export default function Followers({params}) {
    const router = useRouter();

    const username = params.username;
    let userId;

    const [user, setUser] = useState({ show: false });
    const [me, setMe] = useState({ });

    const [following, setFollowing] = useState([]);

    const getUserFollowers = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/follow/${userId}/followers`, {
            method: 'GET'
        });

        console.log(response.status);

        if (response.status != 200) return;

        const followingUsers = await response.json();
        setFollowing(followingUsers);
    }

    const getUser = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${username}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (response.status != 200) {
            router.push('/404');
            return;
        }

        const user = await response.json();
        userId = user.id_user;
        setUser(user);
    }

    const getMe = async () => {
        const accessToken = await getAccessToken(Cookies);

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/@me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status != 200) return;

        const data = await response.json();

        setMe(data);
    }

    useEffect(() => {
        (async () => {
            await getUser();
            await getMe();
            await getUserFollowers();
        })();
    }, []);

    return (
        <main>
            <Navbar />
            <section className="flex flex-col items-center">
                <h2 className="text-2xl mt-8"><a href={`/user/${user.username}`} className="normal-link">{user.username}</a> followers:</h2>
                <section className="flex flex-col w-1/4 gap-4 mt-8">
                    {following.map((follow, index) => {
                        return (
                            <FollowedUser key={index} id_follow={follow.id_follow} id_followed={follow.id_follower} me={me} />
                        );
                    })}
                </section>
            </section>
        </main>
    )
}