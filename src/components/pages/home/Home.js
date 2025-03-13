import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Hero from "./home-components/Hero";
import Ads from "./home-components/Ads";
import PostCardDos from "./home-components/PostCardDos";
import Pagination from "../../services/Pagination"; // Import Pagination component

const Home = () => {
const REACT_APP_URL = process.env.REACT_APP_URL;

  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Default to 1 to avoid null errors

  useEffect(() => {
    fetch(
      `${REACT_APP_URL}wp-json/wp/v2/posts?per_page=6&page=${count}&_embed&has_featured_media=true`
    )
      .then((response) => {
        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        if (totalPagesHeader) {
          setTotalPages(Number(totalPagesHeader)); // Ensure it's a number
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }, [REACT_APP_URL, count]);

  const handlePageClick = (pageNumber) => {
    setCount(pageNumber);
  };

  return (
    <>
      <Hero />
      <Ads />

      <section className="posts">
        <div className="container">
          <div className="row g-3">
            <h2 className="text-md-start">Latest Posts</h2>

            {posts.map((post) => (
              <PostCardDos key={post.id} post={post} />
            ))}
          </div>

          <div className="viewall text-center">
            <Link to="/">View All Posts</Link>
          </div>
        </div>
      </section>

      {/* Reusable Pagination Component */}
      <Pagination
        currentPage={count}
        totalPages={totalPages}
        onPageChange={handlePageClick}
      />

      <Ads />
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center pb-4 gap-3">
          <Link className="btn align-self-center" to="/bloge">
            Test
          </Link>
          <Link className="btn align-self-center" to="/kontakt">
            Kontakt
          </Link>
          <Link className="btn align-self-center" to="/aboutus">
            About Us
          </Link>
          <Link className="btn align-self-center" to="/exchange">
            Exchange
          </Link>
          <Link className="btn align-self-center" to="/countries">
            Countries
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
