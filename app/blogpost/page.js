'use client'
import React from 'react'
import '../css/blogpost.css';
import Cookies from 'js-cookie';
import { Main } from 'next/document';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const BlogPost = () => {

  const CreateBlogpost = async(event) =>{
    event.preventDefault();

    const title =  event.target.title.value;
    const description = event.target.description.value;
    const content = event.target.content.value;

    const accessToken = Cookies.get('accessToken');

    const reqBody = {title: title, description: description,content: content, id_author: 1};

    const response = await fetch('http://localhost:8080/blogPost/blogPost', {
        method: 'POST',
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
   <form className="form" onSubmit={CreateBlogpost}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" placeholder="Title" />
            <label htmlFor="dscription">Description</label>
            <textarea type="text" name="description"  rows="5" cols="1" placeholder="Description" />
            <label htmlFor="content">Content</label>

            <div id="editor">

            <textarea id="markdown-content" type="content" rows="35" cols="35" name="content" placeholder="Content" onChange={UpdateMarkdown}></textarea>
        
            <div id="html-preview"></div>

            </div>
            <button id="editor-mode"></button>

            <label htmlFor="file">Select pictures</label>
            <input type='file'></input>
            <button type="submit">Submit</button>
   </form>

    
  )
}

export default BlogPost;
