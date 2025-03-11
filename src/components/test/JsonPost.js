import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

const JsonPost = () => {

  const [posts, setPosts] =useState([]);

  useEffect(
    () => {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(respone => respone.json())
      .then(data => setPosts(data))
    }, []
  );

  return (
    <>
      <div className="container">
        <div className="row">
          {posts.map(post => (
            <div className="col-md-6 p-3">
              <h1>{post.title}</h1>
              <p>{post.body}</p>
              <Link to={'/JsonPostSingle/' + post.id}>{post.title}</Link>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default JsonPost;
