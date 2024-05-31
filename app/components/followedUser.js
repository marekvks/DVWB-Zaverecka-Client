'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Cookies from "js-cookie";
import { getAccessToken } from "@/lib/auth";

import { Slide, toast } from "react-toastify";

export default function FollowedUser({ id_follow, me, id_followed }) {
    const [followed, setFollowed] = useState({});
    const [meFollowing, setMeFollowing] = useState(false);
    const [avatar, setAvatar] = useState('');

    const getFollowed = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/id/` + id_followed, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status != 200) return;

        const data = await response.json();
        setFollowed(data);
    }

    const getMeFollowing = async () => {
        if (!me.id_user) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/follow/${me.id_user}/following`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status != 200) return;

        const data = await response.json();

        const following = data.find(follow => follow.id_followed === id_followed);

        if (!following) return;

        setMeFollowing(true);
    }

    const getAvatar = async () => {
        const pfpResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/id/${id_followed}/avatar`, {
            method: 'GET'
        });

        const img = await pfpResponse.blob();
        const imgSrc = URL.createObjectURL(img);
        setAvatar(imgSrc);
    }

    const unfollow = async () => {
        const accessToken = await getAccessToken(Cookies);

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/follow/${id_followed}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status != 204) return;

        window.location.reload();
    }

    const follow = async () => {
        const accessToken = await getAccessToken(Cookies);

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/follow`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ followedId: id_followed })
        });

        if (response.status === 201) {
            toast.success('user followed.', {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });

            window.location.reload();
        }
    }

    useEffect(() => {
        (async () => {
            await getFollowed();
            await getAvatar();
            await getMeFollowing();
        })();
    }, []);

    return(
        <article className="flex flex-row justify-between items-center w-full border border-solid border-greenDark px-4 py-4 rounded-xl">
            <div className="flex flex-row items-center gap-4">
                <Image src={avatar} width="40" height="40" className="min-h-16 min-w-16 h-16 w-16 rounded-full border border-solid border-greenBright"/>
                <Link href={`/user/${followed.username}`} className="normal-link text-xl">{followed.username}</Link>
            </div>
            {meFollowing &&
                <button onClick={unfollow} className="text-lg px-4 h-12">Unfollow</button>
            }
            {!meFollowing && me.id_user !== id_followed &&
                <button onClick={follow} className="text-lg px-4 h-12">Follow</button>
            }
        </article>
    );
}