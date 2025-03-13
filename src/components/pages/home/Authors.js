import React, { useEffect, useState } from "react";
import Loading from "./home-components/Loading";
import PostCardDos from "./home-components/PostCardDos";
import Pagination from "../../services/Pagination";

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isAuthorsLoading, setIsAuthorsLoading] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch authors on mount
  useEffect(() => {
    fetch(
      "https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/users?per_page=100"
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setAuthors(data);
          setSelectedAuthor(data[0].id); // Set default author ID
        }
        setIsAuthorsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
        setIsAuthorsLoading(false);
      });
  }, []);

  // Fetch posts for selected author
  useEffect(() => {
    if (!selectedAuthor) return;
  
    setIsPostsLoading(true);
    fetch(
      `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts?_embed&author=${selectedAuthor}&per_page=6&page=${count}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        if (totalPagesHeader) setTotalPages(Number(totalPagesHeader));
        return response.json();
      })
      .then((postsData) => {
        setPosts(postsData);
        setIsPostsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setIsPostsLoading(false);
      });
  }, [selectedAuthor, count]); // Re-run when `selectedAuthor` changes

  const handlePageClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCount(pageNumber);
  };

  // When changing author, reset the page count and fetch new posts
  const handleAuthorChange = (e) => {
    const newAuthor = Number(e.target.value);
    setSelectedAuthor(newAuthor);
    setCount(1); // Reset to first page when author changes
  };

  return (
    <section className="posts fullH">
      <div className="container mb-3">
        {/* Author Selection Dropdown */}
        <div className="row mb-4">
          <div className="text-center d-flex flex-column align-items-center">
            <label htmlFor="authors">Select Author</label>
            {isAuthorsLoading ? (
              <div>Loading authors...</div>
            ) : (
              <select
                value={selectedAuthor || ""}
                name="authors"
                id="authors"
                onChange={handleAuthorChange}
                className="postSelect"
              >
                {authors.map((author) => (
                  <option
                    className="selector"
                    key={author.id}
                    value={author.id}
                  >
                    {author.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="row g-3">
          {isPostsLoading ? (
            <Loading />
          ) : posts.length > 0 ? (
            posts.map((post) => <PostCardDos key={post.id} post={post} />)
          ) : (
            <div className="text-center">
              No posts available for this author.
            </div>
          )}
        </div>
        <Pagination
          currentPage={count}
          totalPages={totalPages}
          onPageChange={handlePageClick}
        />
      </div>
    </section>
  );
};

export default Author;
