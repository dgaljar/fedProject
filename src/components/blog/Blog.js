import React, { useEffect, useState } from "react";
import "./Blog.css";
import MediaImg from "./MediaImg";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      "https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts?author=3"
    )
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <div className="container blog">
        <h1>Blog</h1>
        {posts.map((post) => (
          <div className="row mb-5" key={post.id}>
            <div className="col-md-5">
              <MediaImg id={post.featured_media} size="medium_large" />
            </div>
            <div className="col-md-6 offset-md-1 d-flex flex-column justify-content-between">
              <div>
                <Link to={'/bloge/' + post.slug}>
                    <h2 dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                </Link>
                <p dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></p>
                <p>{post.id}</p>
              </div>
              <div className="d-flex justify-content-between">
                <div>Author</div>
                <div>Date</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blog;


