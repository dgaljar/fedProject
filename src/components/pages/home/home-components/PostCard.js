import React, { useEffect, useState } from "react";
import "./PostCard.css";
import LoadingPost from "./LoadingPost";
import PostImg from "./PostImg"
import PostAuthor from "./PostAuthor";
import PostDate from "./PostDate";
import PostCategory from "./PostCategory";
import { Link } from "react-router-dom";



const PostCard = ({ postId }) => {
  const [post, setPost] = useState(null); // Store the specific post
  // const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
      fetch(
        `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts/${postId}`
      )
        .then((response) => response.json())
        .then((data) => setPost(data));
    }, [{postId}]);
    

  if(!post) return <LoadingPost />
  
  return (
    <div className="col-md-4">
      <div className="post-card">
        <div className="d-flex flex-column">
          <PostImg id={post.featured_media} size="medium" />
          <div className="post-details">
            <PostCategory id={post.categories} />
            <Link to={`/blog/` + post.slug}>
            <h3 dangerouslySetInnerHTML={{__html: post?.title?.rendered}} />
            </Link>
          </div>
        </div>
        <div className="post-author">
          <img className="profile-img" src="/img/profile-wilson.webp" loading="lazy" alt="profile picture" width="36px" height="36px" />
          <div className="namedate">
            <PostAuthor id={post.author} />
            <PostDate id={post.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
