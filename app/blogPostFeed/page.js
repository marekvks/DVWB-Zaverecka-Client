import React from 'react'
import '../css/blogPostFeed.css';
import Link from 'next/link';

const BlogPostFeed = async() => {

  const res = await fetch('http://localhost:8080/blogPost/blogPost',
    {next: {revalidate: 10}});
  const blogPosts = await res.json();

  return (
   <div className='content'>
    <h1>Blogposts feed</h1>

    {blogPosts.map(blogpost => 
        <Link href={'/blogPost/' + blogpost.id_blogpost}>
        <div className='blogPostPreview'>

          <div className='blogPostTitle'> 
          <h2>{blogpost.title}</h2>
          <p>{blogpost.date}</p>
          </div>
    
          <div className='blogPostContent'>
            <p>{blogpost.description}</p>
            <img src='/raccoon-dance.gif' alt="404" height="600" width="600"></img>
          </div>
        </div>
        </Link>
        )}       
   </div>
  )
}

export default BlogPostFeed;