'use client'

import React from 'react'
import '@/css/blogPostEditor.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const UpdateMarkdownDiv = () => {

    const UpdateMarkdown = (event) => {
        const htmlPreview = document.getElementById('html-preview');
        const input = event.target.value;
    
        const htmlOutput = marked.parse(input);
        htmlPreview.innerHTML = DOMPurify.sanitize(htmlOutput,
          {USE_PROFILES: {html: true}});
      }

  return (
   
    <textarea id="markdown-content" type="content" rows="35" cols="35" name="content" placeholder="Content" onChange={UpdateMarkdown}></textarea>

  )
}

export default UpdateMarkdownDiv;