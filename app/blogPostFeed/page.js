'use client'

import React from 'react'
import { useState, useEffect } from "react";

import Navbar from '@/components/navbar';
import BlogPostCard from '@/components/blogpostCard';
import { useRouter } from 'next/navigation';

const BlogPostFeed = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const router = useRouter();

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
  <marin>
    <Navbar search={true} />
    <section className="flex flex-row justify-center w-full min-h-screen">
      <section className="flex flex-col align-center w-5/12 gap-6 mt-10 mb-10">
      {blogPosts.map((blogpost, index) =>
        <BlogPostCard key={index} blogpostId={blogpost.id_blogpost} title={blogpost.title} description={blogpost.description} authorId={blogpost.id_author} initDate={blogpost.date} tags={["none", "none", "none"]} likes={blogpost.likes} />
      )}
        </section>
    </section>
    </marin>
  )
}

export default BlogPostFeed;