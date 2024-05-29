'use client'

import React from 'react'
import '@/css/blogPostEditor.css';
import { useState, useEffect } from "react";
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { getAccessToken } from '@/lib/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function BlogPost({params}){

  const [blogPost, setBlogPost] = useState({})

    useEffect(() => {
      (async () => {
        const accessToken = await getAccessToken(Cookies);
        const blogRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/` + params.blogPostId,
       {next: {revalidate: 5},
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }});
        const blogPost = await blogRes.json();
        setBlogPost(blogPost[0]); 
      })();
    });

    const UpdateBlogPost = async(event) =>{
      event.preventDefault();

      const title =  event.target.title.value;
      const description = event.target.description.value;
      const content = event.target.content.value;

      const accessToken = await getAccessToken(Cookies);

      const reqBody = {title: title, description: description,content: content, id_author: 1};

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/` + blogPost.id_blogpost, {
         method: 'PATCH',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${accessToken}`
         },
        credentials: 'include',
        body: JSON.stringify(reqBody)
    });

    console.log(reqBody);
    }

    const UpdateMarkdown = (event) => {
      const htmlPreview = document.getElementById('html-preview');
      const input = event.target.value;
  
      const htmlOutput = marked.parse(input);
      htmlPreview.innerHTML = DOMPurify.sanitize(htmlOutput,
        {USE_PROFILES: {html: true}});
    }
    
  
  return (
    <form className="form" onSubmit={UpdateBlogPost}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" placeholder="Title" defaultValue={blogPost.title}/>
            <label htmlFor="dscription">Description</label>
            <textarea type="text" name="description"  rows="5" cols="1" placeholder="Description" defaultValue={blogPost.description}/>
            <label htmlFor="content">Content</label>

            <div id="editor">

            <textarea id="markdown-content" type="content" rows="35" cols="35" name="content" placeholder="Content" onChange={UpdateMarkdown} defaultValue={blogPost.content}></textarea>
        
            <div id="html-preview"></div>

            </div>
            <button id="editor-mode"></button>

            <label htmlFor="file">Select pictures</label>
            <input type='file'></input>
            <button type="submit">Submit</button>
   </form>
  )
}
