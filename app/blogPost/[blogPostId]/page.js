'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import DOMPurify from 'dompurify';
import { marked } from 'marked';

import { getAccessToken } from '@/lib/auth';
import Cookies from 'js-cookie';

import { toast, Slide } from 'react-toastify';
import Image from 'next/image';
import Link from "next/link";

import Navbar from '@/components/navbar';
import Comment from '@/components/comment';

import styles from '@/css/github-markdown-dark.module.css';


export default function BlogPostDetails({params}){
    const router = useRouter();

    const [blogPost, setBlogPost] = useState({});
    const [htmlOutput, setHtmlOutput] = useState('');
    const [author, setAuthor] = useState({});
    const [me, setMe] = useState({});
    const [userAvatar, setUserAvatar] = useState('');
    const [avatar, setAvatar] = useState('');
    const [comments, setComments] = useState([]);

    const getComments = async (id_blogpost) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/fromPost/${id_blogpost}`, {
            method: 'GET'
        });

        if (response.status != 200) return;

        const comments = await response.json();
        setComments(comments);
    }

    const getBlogPost = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/` + params.blogPostId);

        if (response.status != 200) {
            router.push('/404');
            return;
        }

        const data = await response.json();
        setBlogPost(data);
        await getComments(params.blogPostId);

        const parsedInput = marked.parse(data.content);
        setHtmlOutput(DOMPurify.sanitize(parsedInput));

        const responseAuthor = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/id/` + data.id_author);
        const avatarData = await responseAuthor.json();
        await getAvatar(avatarData.id_user);

        setAuthor(avatarData);
      }

      const getAvatar = async (id) => {
        const pfpResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/id/${id}/avatar`, {
            method: 'GET'
        });

        const img = await pfpResponse.blob();
        const imgSrc = URL.createObjectURL(img);
        setAvatar(imgSrc);
    }

    const getMe = async () => {
        const accessToken = await getAccessToken(Cookies);

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/@me`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (response.status != 200) return;

        const data = await response.json();

        setMe(data);
        await getUserAvatar(accessToken);
    }

    const getUserAvatar = async (accessToken) => {
        const pfpResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/@me/avatar`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const img = await pfpResponse.blob();
        const imgSrc = URL.createObjectURL(img);
        setUserAvatar(imgSrc);
    }

    const postComment = async (event) => {
        event.preventDefault();

        const accessToken = await getAccessToken(Cookies);

        const content = event.target.comment.value;

        const reqBody = {
            postId: blogPost.id_blogpost,
            content: content
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        });

        if (response.status === 201) {
            toast.success('comment created.', {
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
        await getBlogPost();
        await getMe();
    })();
    }, []);

    return(
        <main>
            <Navbar />
            <section className="flex justify-center">
                <section className="flex flex-col w-1/3 min-h-screen mb-16">
                    <article className="mt-8 pb-8 border-b border-greenDark">
                        <h1 className="text-5xl">{blogPost.title}</h1>
                        <p className="text-justify text-xl mt-8 text-greyText">{blogPost.description}</p>
                        <div className="flex flex-row items-center gap-4 mt-8">
                            <Image src={avatar} width="50" height="50" className="w-12 h-12 rounded-full border border-solid border-greenBright" />
                            <Link href={`/user/${author.username}`} className="text-right text-l normal-link text-xl">{author.username}</Link>
                        </div>
                    </article>
                    <article className="mt-16">
                        <div dangerouslySetInnerHTML={{ __html: htmlOutput}} className={styles.markdownBody} />
                    </article>
                    {me.id_user === blogPost.id_author &&
                        <Link href={`/editBlogPost/${blogPost.id_blogpost}`} className="mt-16 self-start border border-greenBright px-10 py-2 rounded-xl hover:bg-greenDark transition-all">Edit post</Link>
                    }
                    <section className="mt-20">
                        {me.id_user &&
                            <div className="flex flex-row gap-4">
                                <Image src={userAvatar} width="50" height="50" className="mt-2 min-w-12 min-h-12 w-12 h-12 rounded-full border border-solid border-greenBright" />
                                <form onSubmit={postComment}>
                                    <textarea name="comment" placeholder="say something" className="w-full h-28 border border-solid border-greenDark rounded-xl resize-none"></textarea>
                                    <button type="submit" className="mt-4 self-end border border-greenBright px-10 py-2 rounded-xl hover:bg-greenDark transition-all">Post comment</button>
                                </form>
                            </div>
                        }
                        <h1 className="text-3xl mt-16">Comments</h1>
                        <section className="flex flex-col gap-8 mt-8">
                            {comments.map((comment, index) => 
                                <Comment key={index} id_author={comment.id_author} content={comment.content} date={comment.date} />
                            )}
                        </section>
                    </section>
                </section>
            </section>
        </main>
    )
}
