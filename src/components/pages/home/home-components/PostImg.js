import React from 'react';

// PostImage component to handle displaying the image
const PostImg = ({ post, size }) => {
  // Ensure we have image data

  // Get the specific size from the image data (default to 'medium' if no size is passed)
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.media_details.sizes[size].source_url; // Fallback to 'medium' if the requested size is not found
  const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text; // Get the alt text for the image

  return (
    <img
      className="postimg"
      src={imageUrl}
      alt={imageAlt}
      loading="lazy"
    />
  );
};

export default PostImg;
