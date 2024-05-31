'use client'

import React from 'react'
import { useState, useEffect } from "react";
import BlogPostCard from '@/components/blogpostCard';
import Navbar from '@/components/navbar';

const BlogPostSearch = ({params}) => {
  const [blogPostData, setBlogPostData] = useState([]);

  useEffect(() => {
    (async () => {
        const searcgInput = params.blogPostSearch;
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/blogPostTitle/${searcgInput}`, { cache: 'no-store' }
        );

        
        const jsonResponse = await response.json();
        setBlogPostData(jsonResponse)
    })();
  }, []);

  return (
    <marin>
    <Navbar search={true} />
    <section className="flex flex-row justify-center w-full min-h-screen">
      <section className="flex flex-col align-center w-5/12 gap-6 mt-10 mb-10">
      {blogPostData.map((blogpost, index) =>
        <BlogPostCard key={index} blogpostId={blogpost.id_blogpost} title={blogpost.title} description={blogpost.description} authorId={blogpost.id_author} initDate={blogpost.date} tags={["none", "none", "none"]} />
      )}
        </section>
    </section>
    </marin>
  )
}

export default BlogPostSearch;