import React from "react";
import LoadingHero from "./LoadingHero";
import PostDate from "./PostDate";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = ({post, loading}) => {

  if (loading) return <LoadingHero />;

  // If no post is found (fallback)
  if (!post) return <div>No post found.</div>;

  const { title, slug } = post;
  const category      = post.term_name || "technology";

  return (
    <>
      <section className="hero">
        <div className="container">
          <img src={post?.featured_media?.full || post?.featured_media?.medium} alt={title.rendered || "https://placehold.co/600x400" } />
          <div className="col-md-6">
          <div className="hero-card">
            <Link className="btn" to={`/category/${category}`}>
              {category}
            </Link>
            <Link to={`/blog/${slug}`}>
              <h1 dangerouslySetInnerHTML={{__html: title.rendered}} />
              <p className="excerpt" dangerouslySetInnerHTML={{__html: post.excerpt.rendered.substring(0, 85) + "..."}} />

            </Link>
            <span>
              <img
                className="profile-img-hero"
                src={post.author.avatar_url || 
                  `${process.env.PUBLIC_URL}/img/profile-jason.webp`}
                alt="jason"
                width="51px"
              />
              <PostAuthor name={post.author.name} slug={post.author.slug} />
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
