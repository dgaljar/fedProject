import React, { useEffect, useState } from "react";
import PostCardDos from "../home/home-components/PostCardDos";
import Loading from "../home/home-components/Loading";
import { useParams } from "react-router-dom";
import Pagination from "../../services/Pagination";

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
        `https://frontend.internetskimarketing.eu/backend/wp-json/custom/v1/post-details?author=${postId}&per_page=6&page=${count}`
      )
        .then((response) => {
          const totalPagesHeader = response.headers.get("X-WP-TotalPages");
          setTotalPages(totalPagesHeader);
          return response.json();
        })
        .then((data) => {
          setPosts(data.posts);
        });
    }
  }, [postId, count]);

  const handlePageClick = (pageNumber) => {
    setCount(pageNumber);
    const postsSection = document.getElementById("posts");
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!authors.length) return <Loading />;

  return (
    <>
      <div id="posts" className="container">
        <div className="row">
          <h1>Posts by {authors[0]?.name}</h1>
        </div>
      </div>
      <section id="posts" className="posts fullH my-3">
        <div className="container">
          <div className="row g-3">
            {posts.map((post) => (
              <PostCardDos key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* paginacija   */}
        <Pagination
          currentPage={count}
          totalPages={totalPages}
          onPageChange={handlePageClick}
        />
      </section>
    </>
  );
};

export default AuthorsPage;
