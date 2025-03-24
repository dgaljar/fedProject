import React from "react";

const PostDate = ({ date }) => {

  const formattedDate = new Date(date).toLocaleDateString("en-GB")

  return (
    
    <span className="herodate">{formattedDate}</span>
  );
};

export default PostDate;
