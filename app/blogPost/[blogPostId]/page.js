'use client'

import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import '@/css/blogPost.css';
import { marked } from 'marked';
import Link from 'next/link';


export default function BlogPostDetails({params}){

    const [blogPost, setBlogPost] = useState({});
    const [htmlOutput, setHtmlOutput] = useState('');

    const getBlogPost = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/` + params.blogPostId);

        const blogPost = await response.json();
        setBlogPost(blogPost);
        const parsedInput = marked.parse(blogPost.content);
        setHtmlOutput(DOMPurify.sanitize(parsedInput));
      }
    
      useEffect(() => {
        (async () => {
          await getBlogPost();
        })();
      }, []);

    return(
        <div className='blogPost'>
            <h1>{blogPost.title}</h1>
            <p className='description'>{blogPost.description}</p>
            <div dangerouslySetInnerHTML={{ __html: htmlOutput}} />
            <img src='/raccoon-dance.gif' alt="404"></img>
            <Link href={'/createBlogPost/' + blogPost.id_blogpost}>
            <p>Edit BlogPost</p>
            </Link>
        </div>
    )
}
