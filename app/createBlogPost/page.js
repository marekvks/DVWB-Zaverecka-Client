'use client'

import React from 'react';
import { useState } from 'react';

import Cookies from 'js-cookie';
import { getAccessToken } from '@/lib/auth';

import DOMPurify from 'dompurify';
import { marked } from 'marked';

import styles from '@/css/github-markdown-dark.module.css';
import { toast, Slide } from 'react-toastify';

import Navbar from '@/components/navbar';

export default function BlogPost() {

  const [preview, setPreview] = useState('');

  const CreateBlogpost = async(event) =>{
    event.preventDefault();

    const title =  event.target.title.value;
    const description = event.target.description.value;
    const content = event.target.content.value;

    const accessToken = await getAccessToken(Cookies);

    const reqBody = {title: title, description: description, content: content, id_author: 1};

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        credentials: 'include',
        body: JSON.stringify(reqBody)
    });

    if (response.status === 201) {
      toast.success('blogpost successfully created.', {
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
        <form className="flex flex-col justify-center w-1/2 my-16 gap-4" onSubmit={CreateBlogpost}>
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" placeholder="Title" className="w-1/2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea type="text" name="description"  rows="5" cols="1" placeholder="Description" className="bg-blackBackground max-w-1/2 w-1/2 max-h-28 h-28 resize-none border border-solid border-greenDark" />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="editor">Content</label>
            <div className="flex flex-row w-full">
              <textarea id="markdown-content" type="content" rows="35" cols="35" name="content" placeholder="Content" onChange={UpdateMarkdown} className="rounded-r-none resize-none w-1/2" style={{ maxHeight: '80vh', height: '80vh' }}></textarea>
                <div className="px-8 border border-solid border-l-0 border-greenDark w-1/2 h-46 overflow-y-scroll" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px', maxHeight: '80vh', height: '80vh' }}>
                  <div id="html-preview" className={styles.markdownBody} dangerouslySetInnerHTML={{ __html: preview }}></div>
                </div>
            </div>
          </div>

          <button type="submit" className="w-32">Submit</button>
        </form>
      </section>
    </main>
  )
}
