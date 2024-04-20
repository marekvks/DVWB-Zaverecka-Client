'use client'
import React from 'react'
import '../css/blogpost.css';

const BlogPost = () => {

  const CreateBlogpost = async(event) =>{
    event.preventDefault();

    const title =  event.target.title.value;
    const description = event.target.description.value;
    const content = event.target.content.value;


    const reqBody = {title: title, content: content, id_author: 1};

    const response = await fetch('http://localhost:3001/blogPost/blogPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(reqBody)
    });

    console.log(reqBody);
  }

  return (
   <form className="form" onSubmit={CreateBlogpost}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" placeholder="Title" />
            <label htmlFor="dscription">Description</label>
            <textarea type="text" name="description"  rows="5" cols="1" placeholder="Description" />
            <label htmlFor="content">Content</label>
            <textarea type="content" rows="35" cols="35" name="content" placeholder="Content" />
            <label htmlFor="file">Select pictures</label>
            <input type='file'></input>
            <button type="submit">Submit</button>
   </form>
  )
}

export default BlogPost;
