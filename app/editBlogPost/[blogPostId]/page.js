'use client'

import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import { getAccessToken } from '@/lib/auth';
import Cookies from 'js-cookie';

import { marked } from 'marked';
import DOMPurify from 'dompurify';

import { toast, Slide } from 'react-toastify';
import Navbar from '@/components/navbar';

import styles from '@/css/github-markdown-dark.module.css';

export default function BlogPost({params}){
  const router = useRouter();

  const [blogPost, setBlogPost] = useState({});
  const [preview, setPreview] = useState('');

  let blogPostAuthorId = undefined;
  let meId = undefined;

  const getBlogPost = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/` + params.blogPostId);

    if (response.status != 200) {
      router.push('/404');
      return;
    }

    const blogPost = await response.json();
    blogPostAuthorId = blogPost.id_author;
    setBlogPost(blogPost);
    setDefaultPreview(blogPost.content);
  }
  
  const setDefaultPreview = (content) => {
    const htmlOutput = marked.parse(content);
    const sanitizedHTML = DOMPurify.sanitize(htmlOutput, {
      USE_PROFILES: {
        html: true
      }
    });

    setPreview(sanitizedHTML);
  }

  const getMe = async () => {
    const accessToken = await getAccessToken(Cookies);

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/@me`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
    });

    if (response.status != 200)
      return;

    const data = await response.json();
    meId = data.id_user;
  }

  useEffect(() => {
    (async () => {
      await getBlogPost();
      await getMe();

      if (meId != blogPostAuthorId || !meId)
        router.push('/404');
    })();
  }, []);

  const UpdateBlogPost = async(event) =>{
    event.preventDefault();

    const title =  event.target.title.value;
    const description = event.target.description.value;
    const content = event.target.content.value;

    console.log(description);

    const accessToken = await getAccessToken(Cookies);

    const reqBody = { title: title, description: description, content: content };

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/` + blogPost.id_blogpost, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
      credentials: 'include',
      body: JSON.stringify(reqBody)
    });

    if (response.status == 200) {
      toast.success('blogpost successfully edited.', {
        position: "top-center",
        hideProgressBar: true,
        theme: "dark",
        transition: Slide
      });
    }
  }

  const UpdateMarkdown = (event) => {
    const mdContent = event.target.value;

    const htmlOutput = marked.parse(mdContent);
    const sanitizedHTML = DOMPurify.sanitize(htmlOutput, {
      USE_PROFILES: {
        html: true
      }
    });

    setPreview(sanitizedHTML);
  }
  
  
  return (
   <main>
   <Navbar />
   <section className="flex flex-row justify-center w-full min-h-full">
     <form className="flex flex-col justify-center w-1/2 my-16 gap-4" onSubmit={UpdateBlogPost}>
       <div className="flex flex-col">
         <label htmlFor="title">Title</label>
         <input type="text" name="title" placeholder="Title" className="w-1/2" defaultValue={blogPost.title} />
       </div>
       <div className="flex flex-col">
         <label htmlFor="description">Description</label>
         <textarea type="text" name="description"  rows="5" cols="1" placeholder="Description" defaultValue={blogPost.description} className="bg-blackBackground max-w-1/2 w-1/2 max-h-28 h-28 resize-none border border-solid border-greenDark" />
       </div>
       <div className="flex flex-col w-full">
         <label htmlFor="editor">Content</label>
         <div className="flex flex-row w-full">
           <textarea id="markdown-content" type="content" rows="35" cols="35" name="content" placeholder="Content" onChange={UpdateMarkdown} onLoad={UpdateMarkdown} defaultValue={blogPost.content} className="rounded-r-none resize-none h-3/6 w-1/2" style={{ maxHeight: '80vh' }}></textarea>
             <div className="px-8 border border-solid border-l-0 border-greenDark w-1/2 h-46 overflow-y-scroll" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px', maxHeight: '80vh' }}>
               <div id="html-preview" className={styles.markdownBody} dangerouslySetInnerHTML={{ __html: preview }}></div>
             </div>
         </div>
       </div>

       <button type="submit" className="w-32">Edit</button>
     </form>
   </section>
 </main>
  )
}
