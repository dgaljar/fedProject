import React from "react";
import "./PostCard.css";
import LoadingPost from "./LoadingPost";
import PostDate from "./PostDate";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";
import MediaImg from "../../../blog/MediaImg";

// Helper function to truncate text
const truncateText = (text, limit = 100) => {
  if (!text) return "";
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "...";
};

const PostCardDos = ({ post }) => {
  if (!post) return <LoadingPost />;

  const truncatedTitle = truncateText(post?.title?.rendered, 60);
  const imgSize =
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium
      ?.source_url || post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="col-md-4">
      <div className="post-card">
        <div className="d-flex flex-column">
          <img
            className="postimg"
            src={imgSize || "https://placehold.co/600x400?text=Loading..."}
            alt={
              post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
              "placeholder image"
            }
          />
          {/* <MediaImg id={post.featured_media} size={"medium"} /> */}
          <div className="post-details">
            <Link
              className="btn"
              to={`/category/` + post._embedded?.["wp:term"]?.[0]?.[0].slug}
            >
              {post._embedded?.["wp:term"]?.[0]?.[0].name}
            </Link>
            <Link to={`/blog/` + post.slug}>
              <h3 dangerouslySetInnerHTML={{ __html: truncatedTitle }} />
            </Link>
          </div>
        </div>
        <div className="post-author">
          <img
            className="profile-img"
            src={`${process.env.PUBLIC_URL}/img/profile-wilson.webp`}
            loading="lazy"
            alt="profile"
            width="36px"
            height="36px"
          />
          <div className="namedate">
            <PostAuthor
              name={post._embedded.author?.[0]?.name}
              slug={post._embedded.author?.[0]?.slug}
            />
            <PostDate date={post.date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardDos;
