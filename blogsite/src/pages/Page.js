import React, { useEffect, useState } from "react";
import Post from "../posts";
function Page(){
  const[post,setposts]= useState([])
  useEffect(()=>{
    fetch('https://b-log-yz7o.onrender.com/post').then((response=>{
      response.json().then(post=>{
        setposts(post);
      })
    }))
  },[])
    return(
      <div>
        {post.map((post,index)=>(
      <Post key={index} post={post}/>
        ))}
      </div>  
    )
}
export default Page;