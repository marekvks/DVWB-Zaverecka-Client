import React from 'react';
import '@/css/blogPost.css';

export default async function BlogPostDetails({params}){

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/blogPost/` + params.blogPostId,
    {next: {revalidate: 5}});
    const blogPost = await res.json();

    return(
        <div className='blogPost'>
            <h1>{blogPost.title}</h1>
            <p className='description'>{blogPost.description}</p>
            <p className='blogPostContent'>{blogPost.content}</p>
            <img src='/raccoon-dance.gif' alt="404"></img>
        </div>
    )
}