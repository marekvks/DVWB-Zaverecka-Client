'use client'

import React from 'react'
import { useState, useEffect } from "react";

import Navbar from '@/components/navbar';
import BlogPostCard from '@/components/blogpostCard';
import { useRouter } from 'next/navigation';

const BlogPostFeed = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const router = useRouter()
  
  const Search = (e) => {
    e.preventDefault()
    
    if(e.target.search.value != ""){
      router.push("blogPostSearch/" + e.target.search.value)
    }
  }

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
  <main className="flex flex-row justify-center w-full min-h-screen">
    <section className="flex flex-col align-center w-5/12 gap-6 mt-10 mb-10">
      <form onSubmit={Search}>
        <label htmlFor="search"></label>
        <input type='text' name='search' placeholder='Search'></input>
        <button type="submit"></button>
      </form>
    {blogPosts.map((blogpost, index) =>
      <BlogPostCard key={index} blogpostId={blogpost.id_blogpost} title={blogpost.title} description={blogpost.description} authorId={blogpost.id_author} initDate={blogpost.date} tags={["none", "none", "none"]} />
    )}
      </section>
   </main>
  )
}

export default BlogPostFeed;