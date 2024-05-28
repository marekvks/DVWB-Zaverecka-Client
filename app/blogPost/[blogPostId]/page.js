'use client'

import React, { useEffect, useState } from 'react';
import '@/css/blogPost.css';

export default function BlogPostDetails({params}){

    const [blogPost, setBlogPost] = useState({});

    useEffect(async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPostTitle/` + params.blogPostId, {next: {revalidate: 5}});
        const blogPost = await res.json();
        setBlogPost(blogPost[0]);
    }, []);

    return(
        <div className='blogPost'>
            <h1>{blogPost.title}</h1>
            <p className='description'>{blogPost.description}</p>
            <p className='blogPostContent'>{blogPost.content}</p>
            <img src='/raccoon-dance.gif' alt="404"></img>
        </div>
    )
}