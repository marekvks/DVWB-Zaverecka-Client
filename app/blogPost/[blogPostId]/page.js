'use client'

import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

import { getAccessToken } from '@/lib/auth';
import Cookies from 'js-cookie';

import styles from '@/css/github-markdown-dark.module.css';


export default function BlogPostDetails({params}){

    const [blogPost, setBlogPost] = useState({});
    const [htmlOutput, setHtmlOutput] = useState('');
    const [author, setAuthor] = useState({});
    const [me, setMe] = useState({});

    const getBlogPost = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/` + params.blogPostId);

        const blogPost = await response.json();
        setBlogPost(blogPost);
        const parsedInput = marked.parse(blogPost.content);
        setHtmlOutput(DOMPurify.sanitize(parsedInput));

        const responseAuthor = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/id/` + blogPost.id_author);
        const data = await responseAuthor.json();

        setAuthor(data);
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
    }
    
      useEffect(() => {
        (async () => {
          await getBlogPost();
          await getMe();
        })();
      }, []);

    return(
        <main className="flex justify-center">
            <section className="flex flex-col w-1/3 min-h-screen mb-16">
                <article className="mt-8 pb-8 border-b border-greenDark">
                    <h1 className="text-5xl">{blogPost.title}</h1>
                    <p className="text-justify text-xl mt-8">{blogPost.description}</p>
                    <div className="mt-8">
                        <a href={`/user/${author.username}`} className="text-right text-l normal-link">{author.username}</a>
                    </div>
                </article>
                <article className="mt-16">
                    <div dangerouslySetInnerHTML={{ __html: htmlOutput}} className={styles.markdownBody} />
                </article>
                {me.id_user === blogPost.id_author &&
                    <a href={`/createBlogPost/${blogPost.id_blogpost}`} className="mt-16 self-start border border-greenBright px-10 py-2 rounded-xl hover:bg-greenDark transition-all">Edit blogpost</a>
                }
            </section>
        </main>
    )
}
