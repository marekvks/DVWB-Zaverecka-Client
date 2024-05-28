import React from 'react';
import '@/css/blogPost.css';
import { marked } from 'marked';
import Link from 'next/link';


export default async function BlogPostDetails({params}){


    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/blogPost/` + params.blogPostId,
    {next: {revalidate: 5}});
    const blogPost = await res.json();

    
    const input = blogPost[0].content;
    const htmlOutput = marked.parse(input);



    return(
        <div className='blogPost'>
            <h1>{blogPost[0].title}</h1>
            <p className='description'>{blogPost[0].description}</p>
            <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
            <img src='/raccoon-dance.gif' alt="404"></img>
            <Link href={'/blogPostEditor/' + blogPost[0].id_blogpost}>
            <p>Edit BlogPost</p>
            </Link>
        </div>
    )
}
