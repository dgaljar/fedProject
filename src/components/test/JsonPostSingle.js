import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom"
import JsonComments from "./JsonComments"
import {Link} from 'react-router-dom';

const JsonPostSingle = () => {

    const {id} = useParams();
  const [post, setPost] =useState([]);
  const [comments, setComments] =useState([]);
  

  useEffect(
    () => {
      fetch('https://jsonplaceholder.typicode.com/posts/' + id)
      .then(respone => respone.json())
      .then(console.log(fetch))
      .then(data => setPost(data))
    }, [{id}]
  );


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12" key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>

        </div>
      </div>

    <JsonComments postId={id} />

    </>
  );
};

export default JsonPostSingle;
