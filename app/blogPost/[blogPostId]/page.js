import React from 'react'
import '../../css/blogPost.css';

export default async function BlogPostDetails({params}){

    const res = await fetch('http://localhost:8080/blogPost/blogPost/' + params.blogPostId,
    {next: {revalidate: 5}});
    const blogPost = await res.json();

    return(
        <div className='blogPost'>
            <h1>{blogPost.title}</h1>
            <p className='description'>{blogPost.description}</p>
            <p className='blogPostContent'>{blogPost.content}</p>
            <img src='/raccoon-dance.gif' alt="404" height="600" width="600"></img>
        </div>
    )
}