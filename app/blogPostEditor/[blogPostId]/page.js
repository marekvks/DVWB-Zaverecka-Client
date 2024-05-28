import React from 'react'
import '@/css/blogPostEditor.css';
import BlogPostUpdateForm from '@/components/updateBlogPostForm';
import UpdateMarkdownDiv from '@/components/updateMarkdownDiv';

async function BlogPost({params}){
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogPost/blogPost/` + params.blogPostId,
    {next: {revalidate: 5}});
    const blogPost = await res.json();
    const output = blogPost[0];
    console.log(output.title)
    
  
  return (
    <BlogPostUpdateForm>
     <label htmlFor="title">Title</label>
     <input type="text" name="title" placeholder="Title" defaultValue="{output.title}"/>
     <label htmlFor="dscription">Description</label>
     <textarea type="text" name="description"  rows="5" cols="1" placeholder="Description" />
     <label htmlFor="content">Content</label>

        <div id="editor">
         <UpdateMarkdownDiv value={output.content}/>
         <div id="html-preview"></div>
        </div>
        <button id="editor-mode"></button>

        <label htmlFor="file">Select pictures</label>
        <input type='file'></input>
        <button type="submit">Submit</button>
    </BlogPostUpdateForm>
  )
}

export default BlogPost;
