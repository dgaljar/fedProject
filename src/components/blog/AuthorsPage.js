import React, { useEffect, useState } from "react";
import PostCardDos from "../pages/home/home-components/PostCardDos";
import Loading from "../pages/home/home-components/Loading";
import { useParams } from "react-router-dom";

const AuthorsPage = () => {
  const { author } = useParams();
  const [authors, setAuthors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    fetch(
      `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/users?slug=${author}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAuthors(data);
      });
  }, [author]);

  const postId = authors[0]?.id;

  useEffect(() => {
    if (postId) {
      fetch(
        `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts?_embed&author=${postId}&per_page=6&page=${count}`
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
  }, [postId, count]);

  const handlePageClick = (pageNumber) => {
    //kada kliknemo na broj updatea se count i fetcha se nova stranica
    setCount(pageNumber);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null; //ako npr prikazujemo sve postove odjednom nece se prikazati paginacija

    const pages = [];

    // Uvijek prikazuje prvu stranicu
    pages.push(
      <button
        key={1}
        className={`btn ${count === 1 ? "active" : ""}`}
        onClick={() => handlePageClick(1)}
      >
        1
      </button>
    );

    if (count > 3)
      pages.push(
        <span className="ellipsis" key="left-ellipsis">
          ...
        </span>
      );

    // prikazujemo trenutnu straniceu +/- jedna stranica
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
      pages.push(
        <span className="ellipsis" key="right-ellipsis">
          ...
        </span>
      );

    // uvijek prikazuje zadnju stranicu
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

  if (!authors.length) return <Loading />;

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>Posts by {authors[0]?.name}</h1>
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

        {/* paginacija   */}
        <div className="d-flex align-items-center justify-content-center mb-4 pb-4 gap-2">
          <button
            className="btn"
            onClick={() => handlePageClick(count - 1)}
            disabled={count === 1} //ako smo na prvoj stranici ne mozemo kliknuti na button
          >
            Previous
          </button>

          {renderPagination()}

          <button
            className="btn"
            onClick={() => handlePageClick(count + 1)}
            disabled={count === totalPages} //ako smo na zadnjoj stranici ne mozemo kliknuti na button
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default AuthorsPage;
