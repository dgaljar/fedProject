import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Hero from "./home-components/Hero";
import Ads from "./home-components/Ads";
import PostCardDos from "./home-components/PostCardDos";
import Pagination from "../../services/Pagination"; // Import Pagination component
import LoadingPost from "./home-components/LoadingPost";

const Home = () => {
  const REACT_APP_URL = process.env.REACT_APP_URL;

  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [heroPost, setHeroPost] = useState(null);
  const [heroLoad, setHeroLoad] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      `${REACT_APP_URL}wp-json/custom/v1/post-details?per_page=6&page=${count}&has_featured_media=true`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data.posts);
        setTotalPages(data.pagination.total_pages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [REACT_APP_URL, count]);

  useEffect(() => {
    setHeroLoad(true);
    fetch(`${REACT_APP_URL}wp-json/custom/v1/post-details?id=294595`)
      .then((response) => response.json())
      .then((data) => {
        setHeroPost(data);
        setHeroLoad(false);
      });
  }, [REACT_APP_URL]);

  const handlePageClick = (pageNumber) => {
    setCount(pageNumber);
    const postsSection = document.getElementById("posts");
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Hero post={heroPost} loading={heroLoad} />
      <Ads />

      <section id="posts" className="posts mb-5">
        <div className="container">
          <div className="row g-3">
            <h2 className="text-md-start">Latest Posts</h2>

            {loading
              ? [...Array(6)].map((_, index) => {
                  return <LoadingPost key={index} />;
                })
              : posts.map((post) => <PostCardDos key={post.id} post={post} />)}
          </div>
        </div>
      </section>

      {totalPages > 1 && (
        <Pagination
          currentPage={count}
          totalPages={totalPages}
          onPageChange={handlePageClick}
        />
      )}

      <Ads />
    </>
  );
};

export default Home;
