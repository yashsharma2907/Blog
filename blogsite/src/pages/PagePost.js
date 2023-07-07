import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "./Page";

function PagePost(){
const[info,setinfo]= useState(null);
const {id} = useParams();
useEffect(()=>{
fetch(`https://blog-h084.onrender.com/post/${id}`).then(response=>{
    response.json().then(info=>{
        setinfo(info);
    })
})
},[])
if(!info) return '';
    return(
        <div className="pagePost">
       <h1>{info.title}</h1>
       <div className="author">by {info.author.username} </div>
       <div className="image">
        <img src={`https://blog-h084.onrender.com/${info.cover}`} alt="cover"></img>
       </div>
       <div className="content" dangerouslySetInnerHTML={{__html:info.content}}/>
       </div>
       )
}
export default PagePost;