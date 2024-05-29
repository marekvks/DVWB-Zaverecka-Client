'use client'

import Cookies from 'js-cookie';
import { getAccessToken } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { login } from '@/lib/auth';

import { Slide, toast } from 'react-toastify';
import BlogPostCard from '@/components/blogpostCard';


export default function UserPage({params}) {
    const router = useRouter();

    const [editProfile, setEditProfile] = useState(false);

    const username = params.username;    
    const [user, setUser] = useState({ show: false });
    const [me, setMe] = useState({ });

    let currentPassword = '';
    let newPassword = '';
    let confirmPassword = '';

    const changePassword = async (event) => currentPassword = event.target.value;
    const changeNewPassword = async (event) => newPassword = event.target.value;
    const changeConfirmPassword = async (event) => confirmPassword = event.target.value;

    const getUser = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${username}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (response.status != 200) {
            router.push('/404');
            return;
        }

        const data = await response.json();

        setUser(data);
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

    useEffect(async () => {
        await getUser();
        await getMe();
    }, []);

    const handleUpdateMe = async (event) => {
        event.preventDefault();

        const accessToken = await getAccessToken(Cookies);

        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const username = event.target.username.value;
        const email = event.target.email.value;

        const reqBody = { firstName, lastName, username, email };

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/@me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(reqBody)
        });

        if (response.status === 200) {
            toast.success('user successfully updated.', {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });
        }
    }

    const handleUpdatePasword = async (event) => {
        event.preventDefault();

        const accessToken = await getAccessToken(Cookies);

        const reqBody = { currentPassword: currentPassword, password: newPassword, confirmPassword: confirmPassword };

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/@me/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(reqBody)
        });

        if (response.status === 204) {
            toast.success('password successfully updated.', {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });

            const loggedIn = await login(me.email, currentPassword);
            if (loggedIn) {
                router.push('/');
            }
        }
        else {
            if (!response.bodyUsed)
                return;

            const data = await response.json();

            toast.error(data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "dark",
                transition: Slide
            });
        }
    }

    return (
        <main className="flex justify-center">
            <section className="w-1/2 min-h-screen flex flex-row">
                <div className="basis-1/4 w-1/4 self-start mt-52 h-screen">
                    <Image src="/raccoon-dance.gif" alt="pfp" width="500" height="500" className="rounded-full border-2 border-solid border-greenBright" />
                    {editProfile &&
                        <>
                            <form onSubmit={handleUpdateMe} className="mt-10 flex flex-col gap-2 max-w-full">
                                <input type="text" placeholder="first name" name="firstName" defaultValue={user.firstName} />
                                <input type="text" placeholder="last name" name="lastName" defaultValue={user.lastName} />
                                <input type="text" placeholder="username" name="username" defaultValue={user.username} />
                                <input type="email" placeholder="example@example.com" name="email" defaultValue={user.email} />
                                <input type="password" placeholder="current password" name="currentPassword" onChange={changePassword} className="mt-5" />
                                <input type="password" placeholder="new password" name="password" onChange={changeNewPassword} />
                                <input type="password" placeholder="confirm password" name="confirmPassword" onChange={changeConfirmPassword} />
                                <div className="flex flex-row flex-wrap justify-between mt-10 gap-1">
                                    <button className="w-full" onClick={handleUpdatePasword}>Change password</button>
                                    <button className="w-6/12" type="submit">Save</button>
                                    <button className="w-5/12 border-greenDark" onClick={() => setEditProfile(false)}>Close</button>
                                </div>
                            </form>
                        </>
                    }
                    {!editProfile &&
                        <>
                            <h1 className="mt-10">{user.firstName} {user.lastName}</h1>
                            <h2>{user.username}</h2>
                            <h3>{user.email}</h3>
                            {me.id_user === user.id_user &&
                                <button className="w-full mt-10" onClick={() => setEditProfile(true)}>Edit</button>
                            }
                        </>
                    }
                </div>
                <div className="basis-3/4 flex flex-col align-center my-16 gap-8">
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                    <BlogPostCard title="Blogpost 1" description="This is a blogpost" tags={["tag1", "tag2", "tag3"]} />
                </div>
            </section>
        </main>
    )
}