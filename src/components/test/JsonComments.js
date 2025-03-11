import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const JsonComments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((respone) => respone.json())
      .then((data) => setComments(data));
  }, [postId]);

  return (
    <>
      <h2>Komentari</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-3">
          <h5>{comment.name}</h5>
          <p>{comment.body}</p>
          <small>{comment.email}</small>
        </div>
      ))}
    </>
  );
};

export default JsonComments;
