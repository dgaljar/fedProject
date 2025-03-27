import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { searchPosts } from "../../services/api";
import AuthContext from "../users/context/AuthProwider";
import Pagination from "../../services/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBell,
  faMagnifyingGlass,
  faTrashCan,
  faPenToSquare,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const AdminPost = () => {
  const { auth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [totalPosts, setTotalPosts] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      let url =
        auth.role === "administrator"
          ? `https://frontend.internetskimarketing.eu/backend/wp-json/custom/v1/post-details?per_page=10&page=${count}`
          : `https://frontend.internetskimarketing.eu/backend/wp-json/custom/v1/post-details?per_page=10&page=${count}&author=${auth.id}`;

      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch posts");

        const totalUsersHeader = response.headers.get("X-WP-Total");
        setTotalPosts(totalUsersHeader ? Number(totalUsersHeader) : 0);

        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        setTotalPages(totalPagesHeader ? Number(totalPagesHeader) : 1);

        const data = await response.json();
        setPosts(data.posts.length > 0 ? data.posts : []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Ensure it doesn't remain `null`
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [count, auth.role, auth.id]);

  if (auth.role === "subscriber") {
    return <Navigate to="/admin" />;
  }

  const truncateText = (text, limit = 100) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  const handlePageClick = (pageNumber) => {
    //kada kliknemo na broj updatea se count i fetcha se nova stranica
    setCount(pageNumber);
  };

  const deletePost = async (postId) => {
    if (!window.confirm(`Delete post ${postId}?`)) return;

    try {
      const response = await fetch(
        `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts/${postId}?reassign=1&force=true`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (response.ok) {
        setPosts((prev) => prev.filter((post) => post.id !== postId));
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      alert("Error deleting post.");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) return;
    if (!window.confirm("Are you sure you want to delete selected posts?"))
      return;

    for (const userId of selectedPosts) {
      await deletePost(userId);
    }
    setSelectedPosts([]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPosts(posts.map((user) => user.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (userId) => {
    setSelectedPosts((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchPosts(searchQuery);
      setPosts(searchResults); // Fix: Use correct response format
    } catch (err) {
      setError("Failed to search posts...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid content mt-4">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="user-card">
              <h3>Active Posts</h3>
              <span>{totalPosts}</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="user-card">
              <h3>Pending Posts</h3>
              <span className="user-percent"></span>
              user bar
            </div>
          </div>
          <div className="col-md-4"></div>
          <h3>Posts</h3>
          <div className="col-md-6 d-flex align-items-center">
            <div className="adminsearchbar">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="adminsearchinput"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <button
              className="btn btn-danger ms-3"
              onClick={handleBulkDelete}
              disabled={selectedPosts.length === 0}
            >
              Delete Selected
            </button>
          </div>
          <div className="col-12">
            <div className="scroller">
              <table>
                <thead>
                  <tr>
                    <th className="text-start checkbox">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedPosts.length === posts.length &&
                          posts.length > 0
                        }
                      />
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="checkboxarrow"
                      />
                    </th>
                    <th colSpan="8"></th>
                  </tr>
                  <tr className="row2">
                    <th> </th>
                    <th>
                      ID{" "}
                      <a href="#">
                        <i className="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>
                      Publish Date{" "}
                      <a href="#">
                        <i className="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>
                      Status{" "}
                      <a href="#">
                        <i className="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th className="text-center">Delete</th>

                  </tr>
                </thead>
                <tbody>
                  {!loading ? (
                    posts ? (
                      posts.map((post) => {
                        const truncatedTitle = truncateText(
                          post?.title?.rendered,
                          25
                        );
                        const truncatedName = truncateText(
                          post.author.name,
                          25
                        );
                        const formattedDate = new Date(post.date)
                          .toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                          .replace(",", "");
                        return (
                          <tr key={post.id}>
                            <td className="text-start">
                              <input
                                type="checkbox"
                                checked={selectedPosts.includes(post.id)}
                                onChange={() => handleSelectPost(post.id)}
                              />
                            </td>
                            <td>{post.id}</td>
                            <td
                              dangerouslySetInnerHTML={{
                                __html: truncatedTitle,
                              }}
                            ></td>
                            <td>{truncatedName}</td>
                            <td>{post.term_name}</td>
                            <td>{formattedDate}</td>
                            <td>Published</td>
                            {auth.role === "administrator" || "author" ? (
                              <td className="text-center">
                                <button
                                  className="functionButtons"
                                  onClick={() => deletePost(post.id)}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className="red"
                                    onClick={() => deletePost(post.id)}
                                    style={{ cursor: "pointer" }}
                                  />
                                </button>
                              </td>
                            ) : (
                              <></>
                            )}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={11} className="text-center">
                          No posts
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan={10} className="text-center">
                        Loading...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-4 pb-4 gap-2">
            <Pagination
              currentPage={count}
              totalPages={totalPages}
              onPageChange={handlePageClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPost;
