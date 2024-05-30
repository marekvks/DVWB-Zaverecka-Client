'use client'

import React from 'react'
import { useState, useEffect } from "react";
import BlogPostCard from '@/components/blogpostCard';
import { useRouter } from 'next/navigation';

const BlogPostSearch = ({params}) => {
  const [blogPostData, setBlogPostData] = useState([]);

  useEffect(() => {
    (async () => {
        const searcgInput = params.blogPostSearch;
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/blogPostTitle/${searcgInput}`, {
          next: {revalidate: 2}
        });

        
        const jsonResponse = await response.json();
        setBlogPostData(jsonResponse)
    })();
  }, []);

  const router = useRouter()
  
  const Search = (e) => {
      e.preventDefault()
  
      if(e.target.search.value != ""){
        router.push("/blogPostSearch/" + e.target.search.value)
      }else{
        router.push("/blogPostFeed/")
      }
  }

  return (
  <>
  <form onSubmit={Search}>
        <label htmlFor="search"></label>
        <input type='text' name='search' placeholder='Search'></input>
        <button type="submit"></button>
      </form>
  {blogPostData.map((blogpost, index) =>
      <BlogPostCard key={index} blogpostId={blogpost.id_blogpost} title={blogpost.title} description={blogpost.description} authorId={blogpost.id_author} initDate={blogpost.date} tags={["none", "none", "none"]} />
    )}
  </>
  )
}

export default BlogPostSearch;