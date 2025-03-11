import React, { useEffect, useState } from "react";
import LoadingHero from "./LoadingHero";
import PostDate from "./PostDate";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";
import "./Hero.css";

const cleanTitle = (title) => {
  if (!title) return "Untitled Post"; // Fallback for empty titles

  // Create a temporary DOM element to decode HTML entities
  const tempElement = document.createElement("div");
  tempElement.innerHTML = title;

  // Extract the decoded text
  const decodedTitle = tempElement.textContent || tempElement.innerText || "";

  // Remove any remaining HTML tags and trim whitespace
  const sanitizedTitle = decodedTitle.replace(/<\/?[^>]+(>|$)/g, "").trim();

  return sanitizedTitle;
};

const Hero = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    setLoading(true);

    fetch(
      "https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts?_embed&has_featured_media=true"
    )
      .then((response) => response.json())
      .then((data) => {
        setPost(data[4]); // Set the first post
        setLoading(false); // Finished loading
      })
      .catch(() => {
        setLoading(false); // In case of error, stop loading
      });
  }, []);

  // Show loading spinner while fetching data
  if (loading) return <LoadingHero />;

  // If no post is found (fallback)
  if (!post) return <div>No post found.</div>;

  const { title, slug, _embedded, modified } = post;
  const featuredImage = _embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/img/post-beach.webp";
  const category      = _embedded?.["wp:term"]?.[0][0]?.name || "technology";
  const authorName    = _embedded?.author?.[0]?.name || "Ben Dover";
  const postDate      = modified ? new Date(modified).toLocaleDateString() : "N/A";


  return (
    <>
      <section className="hero">
        <div className="container">
          <img src={featuredImage} alt={cleanTitle(title.rendered) || "placeholder" } />
          <div className="col-md-6">
          <div className="hero-card">
            <Link className="btn" to={`/category/${category}`}>
              {category}
            </Link>
            <Link to={`/blog/${slug}`}>
              <h1>{cleanTitle(title.rendered) || "placeholder"}</h1>
            </Link>
            <span>
              <img
                className="profile-img"
                src={`${process.env.PUBLIC_URL}/img/profile-jason.webp`}
                alt="jason"
              />
              {/* <span className="heroname">{authorName}</span> */}
              <PostAuthor name={post._embedded.author?.[0]?.name} slug={post._embedded.author?.[0]?.slug} />
              <PostDate date={post.date} />
            </span>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
