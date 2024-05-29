'use client'

import React from 'react'
import '@/css/blogPostFeed.css';
import Link from 'next/link';

import { useState, useEffect } from "react";

const BlogPostFeed = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost`, {
        next: {revalidate: 10}
      });
      const blogPosts = await res.json();
      setBlogPosts(blogPosts);
    })();
  }, []);

  return (
  <div className='content'>

    <div className='navBarHolder'> 
      <div className='navBar'>

        <div>
          <h1>Blogposts feed</h1>
        </div>

        <form className='searchBarDiv'>
          <img src='/search_icon.jpeg'></img>
          <input className='searchBar' id='search' name='Search' type='text' placeholder='Search'></input>
        </form>

        <div className='userNavBar'>
          <Link href=''>Home</Link>
          <Link href=''>Suport</Link>
          <img src='/raccoon-dance.gif' className='userProfilePicture'></img>
          <p className='username'>marekvks</p>
        </div>

      </div>
      <div className='divider'></div>
    </div>

    {blogPosts.map(blogpost => 
        <Link href={'/blogPost/' + blogpost.id_blogpost}>
        <div className='blogPostPreview'>

          <div className='blogPostTitle'> 
            <div className='userProfile'>
              <img src='/raccoon-dance.gif' className='userProfilePicture'></img>
              <p className='username'>{blogpost.id_author}</p>
            </div>

            <h2>{blogpost.title}</h2>
            <p>{blogpost.date}</p>
          </div>
    
          <div className='blogPostContent'>
            <p>{blogpost.description}</p>
            <img src='/diner.jpg' alt="404"></img>
          </div>
        </div>
        </Link>
        )}       
   </div>
  )
}

export default BlogPostFeed;