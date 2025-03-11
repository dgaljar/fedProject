import React from "react";
import { Link } from "react-router-dom";

const PostAuthor = ({ name, slug }) => {

  const truncateText = (text, limit = 100) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };
  
  const truncatedAuthor = truncateText(name, 20);


  return (
    <>
      <Link to={`author/${slug}`}>
        <span className="heroname">{truncatedAuthor}</span>
      </Link>
    </>
  );
};

export default PostAuthor;
