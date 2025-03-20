import React, { useEffect, useState } from "react";
import PostCardDos from "../pages/home/home-components/PostCardDos";
import Loading from "../pages/home/home-components/Loading";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  // Reset pagination count when category changes
  useEffect(() => {
    setCount(1);
  }, [category]);

  useEffect(() => {
    fetch(
      `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/categories?slug=${category}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, [category]);

  const catId = categories[0]?.id;

  useEffect(() => {
    if (catId) {
      fetch(
        `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts?_embed&categories=${catId}&per_page=6&page=${count}`
      )
        .then((response) => {
          const totalPagesHeader = response.headers.get("X-WP-TotalPages");
          setTotalPages(totalPagesHeader);
          return response.json();
        })
        .then((data) => {
          setPosts(data);
        });
    }
  }, [catId, count]);

  const handlePageClick = (pageNumber) => {
    setCount(pageNumber);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];

    // Always show the first page
    pages.push(
      <button
        key={1}
        className={`btn ${count === 1 ? "active" : ""}`}
        onClick={() => handlePageClick(1)}
      >
        1
      </button>
    );

    if (count > 3) pages.push(<span className="ellipsis" key="left-ellipsis">...</span>);

    // Show current page +/- one page
    for (
      let i = Math.max(2, count - 1);
      i <= Math.min(totalPages - 1, count + 1);
      i++
    ) {
      pages.push(
        <button
          key={i}
          className={`btn ${count === i ? "active" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    if (count < totalPages - 2)
      pages.push(<span className="ellipsis" key="right-ellipsis">...</span>);

    // Always show the last page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={`btn ${count === totalPages ? "active" : ""}`}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  if (!categories.length) return <Loading />;

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>Posts in category {categories[0]?.name}</h1>
        </div>
      </div>
      <section className="posts my-3">
        <div className="container">
          <div className="row g-3">
            {posts.map((post) => (
              <PostCardDos key={post.id} post={post} />
            ))}
          </div>
        </div>
        
        {/* Pagination */}
        <div className="d-flex align-items-center justify-content-center mb-4 pb-4 gap-2">
          <button
            className="btn"
            onClick={() => handlePageClick(count - 1)}
            disabled={count === 1}
          >
            Previous
          </button>

          {renderPagination()}

          <button
            className="btn"
            onClick={() => handlePageClick(count + 1)}
            disabled={count === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
