import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import {Navigate} from "react-router-dom";
import { useState } from 'react';
export default function PostCreate(){
const [title,setTitle] = useState('');
const [summary,setSummary] = useState('');
const [content,setContent] = useState('');
const [files, setFiles] = useState('');
const [redirect, setRedirect] = useState(false);
const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

async function createPost(e){
const data = new FormData();
data.set('title',title);
data.set('summary',summary);
data.set('content',content);
data.set('file',files[0]);
 e.preventDefault();
    const response= await fetch('https://blog-h084.onrender.com/post',{
        method:'POST',
        body:data,
        credentials:'include',
    })
    if (response.ok) {
        setRedirect(true);
      }
}
if (redirect) {
    return <Navigate to={'/'} />
  }
    return(
       <form onSubmit={createPost}>
       <input type="title" placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)} />
       <input type="summary" placeholder={'Summary'} value={summary}onChange={ev => setSummary(ev.target.value)} />
       <input type="file" onChange={ev => setFiles(ev.target.files)} />
        <ReactQuill value={content} theme={'snow'} onChange={setContent} modules={modules} />
        <button style={{marginTop:'10px'}}>Create Post</button>
       </form>
    )
}