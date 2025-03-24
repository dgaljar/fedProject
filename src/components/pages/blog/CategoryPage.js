import React, { useEffect, useState } from "react";
import PostCardDos from "../home/home-components/PostCardDos";
import Loading from "../home/home-components/Loading";
import Pagination from "../../services/Pagination";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {

      fetch(
        `https://frontend.internetskimarketing.eu/backend/wp-json/custom/v1/post-details?category=${category}&per_page=6&page=${count}`
      )
        .then((response) => {
          const totalPagesHeader = response.headers.get("X-WP-TotalPages");
          setTotalPages(totalPagesHeader);
          return response.json();
        })
        .then((data) => {
          setPosts(data.posts);
        });

  }, [ count]);

  const handlePageClick = (pageNumber) => {
    setCount(pageNumber);
  };


  if (!posts.length) return <Loading />;

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>Posts in category {posts[0].term_name}</h1>
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
          <Pagination
          currentPage={count}
          totalPages={totalPages}
          onPageChange={handlePageClick}
          />
      </section>
    </>
  );
};

export default CategoryPage;
