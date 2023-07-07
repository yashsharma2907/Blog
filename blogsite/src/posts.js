import react from "react";
import {formatISO9075} from "date-fns";
// import TimeAgo from 'timeago-react';
import Datetime from 'react-datetime';
import { Link } from "react-router-dom";
function Post({ post}) {
  var createdAt = post.createdAt;
  // var formatted = format(createdAt,"dd/MM/yyyy HH:mm:ss");
  // console.log(createdAt);
  var id = post._id;
 // console.log(id);
  var title = post.title;
  var summary = post.summary;
  var author = post.author.username;
  var cover = post.cover;
  console.log(cover);
  return (
    <div className="post">
      <div className="image">
        <Link to= {`/post/${id}`}>
        <img src={'https://blog-h084.onrender.com/'+cover}></img>
        </Link>
      </div>
      <div className="text">
        <Link to= {`/post/${id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author}</a>
          {/* <time>{formatISO9075(new Date(createdAt))}</time> */}
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  )
}
export default Post;