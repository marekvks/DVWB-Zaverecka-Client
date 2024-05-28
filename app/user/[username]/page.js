'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import BlogPostCard from '@/components/blogpostCard';


export default function UserPage({params}) {
    const router = useRouter();

    const [editProfile, setEditProfile] = useState(false);

    const username = params.username;    
    const [user, setUser] = useState({});

    useEffect(async () => {
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
    }, []);

    const handleUpdateMe = async (event) => {
        event.preventDefault();

        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const username = event.target.username.value;
        const email = event.target.email.value;

        console.log(firstName, lastName, username, email);
    }

    return (
        <main className="flex justify-center">
            <section className="w-1/2 min-h-screen flex flex-row">
                <div className="basis-1/4 w-1/4 self-start mt-52 h-screen">
                    <Image src="/raccoon-dance.gif" alt="pfp" width="500" height="500" className="rounded-full border-2 border-solid border-greenBright" />
                    {editProfile &&
                        <>
                            <form onSubmit={handleUpdateMe}className="mt-10 flex flex-col gap-2 max-w-full">
                                <input type="text" placeholder="first name" name="firstName" defaultValue={user.firstName} />
                                <input type="text" placeholder="last name" name="lastName" defaultValue={user.firstName} />
                                <input type="text" placeholder="username" name="username" defaultValue={user.username} />
                                <input type="email" placeholder="example@example.com" name="email" defaultValue={user.email} />
                                <div className="flex flex-row justify-around mt-10">
                                    <button className="w-5/12" type="submit">Save</button>
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
                            <button className="w-full mt-10" onClick={() => setEditProfile(true)}>Edit</button>
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