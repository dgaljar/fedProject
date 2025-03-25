import React from "react";
import "./PostCard.css";
import LoadingPost from "./LoadingPost";
import PostDate from "./PostDate";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";

// Helper function to truncate text
const truncateText = (text, limit = 100) => {
  if (!text) return "";
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "...";
};

const PostCardDos = ({ post }) => {
  if (!post) return <LoadingPost />;

  const truncatedTitle = truncateText(post?.title?.rendered, 40);
  const imgSize =
   post?.featured_media?.medium ;

  return (
    <div className="col-md-4">
      <div className="post-card">
        <div className="d-flex flex-column">
          <img
            className="postimg"
            src={imgSize || "https://placehold.co/600x400?text=Loading..."}
            alt={
              post.title.rendered
            }
          />
          {/* <MediaImg id={post.featured_media} size={"medium"} /> */}
          <div className="post-details">
            <Link
              className="btn"
              to={`/category/` + post.term_slug}
            >
              {post.term_name}
            </Link>
            <Link to={`/blog/` + post.slug}>
              <h3 dangerouslySetInnerHTML={{ __html: truncatedTitle }} />
              <p className="excerpt" dangerouslySetInnerHTML={{__html: post.excerpt.rendered.substring(0, 85) + "..."}} />
            </Link>
          </div>
        </div>
        <div className="post-author">
          <img
            className="profile-img"
            src={post.author.avatar_url || `${process.env.PUBLIC_URL}/img/profile-wilson.webp`}
            loading="lazy"
            alt="profile"
            width="36px"
            height="36px"
          />
          <div className="namedate">
            <PostAuthor
              name={post.author.name}
              slug={post.author.slug}
            />
            <PostDate date={post.date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardDos;
