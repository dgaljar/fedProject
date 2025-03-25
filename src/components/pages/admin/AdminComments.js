import React, { useEffect, useState, useContext } from "react";
import { searchComments } from "../../services/api";
import { Link } from "react-router-dom";
import Pagination from "../../services/Pagination";
import AuthContext from "../users/context/AuthProwider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCheck,
  faMagnifyingGlass,
  faTrashCan,
  faChevronDown,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [totalComments, setTotalComments] = useState(0);
  const [count, setCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComments, setSelectedComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/comments?per_page=10&page=${count}`
    )
      .then((response) => {
        const totalCommentsHeader = response.headers.get("X-WP-Total");
        setTotalComments(totalCommentsHeader ? Number(totalCommentsHeader) : 0);
        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        setTotalPages(totalPagesHeader ? Number(totalPagesHeader) : 1);
        return response.json();
      })
      .then((data) => {
        setComments(data);
        setLoading(false);
      });
  }, [count]);

  const deleteComment = async (commentId) => {
    if (!window.confirm(`Delete comment ${commentId}?`)) return;

    try {
      const response = await fetch(
        `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/comments/${commentId}?reassign=1&force=true`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (response.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
      } else {
        alert("Failed to delete comment.");
      }
    } catch (error) {
      alert("Error deleting comment.");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedComments.length === 0) return;
    if (!window.confirm("Are you sure you want to delete selected comments?"))
      return;

    for (const commentId of selectedComments) {
      await deleteComment(commentId);
    }
    setSelectedComments([]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedComments(comments.map((comment) => comment.id));
    } else {
      setSelectedComments([]);
    }
  };

  const handleSelectComment = (commentId) => {
    setSelectedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchComments(searchQuery);
      setComments(searchResults); // Fix: Use correct response format
    } catch (err) {
      setError("Failed to search comments...");
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (pageNumber) => {
    //kada kliknemo na broj updatea se count i fetcha se nova stranica
    setCount(pageNumber);
  };

  return (
    <>
      <div className="container-fluid content mt-4">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="user-card">
              <h3>Comments</h3>
              <span>{totalComments}</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="user-card">
              <h3>Pending Comments</h3>
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
            {auth.role === "administrator" && (
              <button
                className="btn btn-danger ms-3"
                onClick={handleBulkDelete}
                disabled={selectedComments.length === 0}
              >
                Delete Selected
              </button>
            )}
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
                          selectedComments.length === comments.length &&
                          comments.length > 0
                        }
                      />
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="checkboxarrow"
                      />{" "}
                    </th>
                    <th colSpan="8"></th>
                  </tr>
                  <tr className="row2">
                    <th> </th>
                    <th>
                      ID{" "}
                      <a href="#">
                        <FontAwesomeIcon icon={faSort} />
                      </a>
                    </th>
                    <th>Content</th>
                    <th>Author</th>
                    <th>
                      Publish Date{" "}
                      <a href="#">
                        <FontAwesomeIcon icon={faSort} />
                      </a>
                    </th>
                    <th className="text-center">
                      Related Post{" "}
                      <a href="#">
                        <FontAwesomeIcon icon={faSort} />
                      </a>
                    </th>
                    <th>
                      Status{" "}
                      <a href="#">
                        <FontAwesomeIcon icon={faSort} />
                      </a>
                    </th>
                    <th className="text-center">Approved</th>
                    {auth.role === "administrator" && (
                      <th className="text-center">Delete</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {!loading ? (
                    comments.map((comment) => {
                      const formattedDate = new Date(comment.date)
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
                        <tr key={comment.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedComments.includes(comment.id)}
                              onChange={() => handleSelectComment(comment.id)}
                            />
                          </td>
                          <td>{comment.id}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: comment.content.rendered,
                            }}
                          />
                          <td>{comment.author_name}</td>
                          <td>{formattedDate}</td>
                          <td className="text-center">
                            <Link to={`/blog/${comment.post_slug}`}>
                              {comment.post}
                            </Link>
                          </td>
                          <td>Published</td>
                          <td className="text-center">
                            {comment.status === "approved" ? (
                              <FontAwesomeIcon icon={faCheck} />
                            ) : (
                              <FontAwesomeIcon icon={faXmark} />
                            )}
                          </td>

                          {auth.role === "administrator" && (
                            <td className="text-center">
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                className="red"
                                onClick={() => deleteComment(comment.id)}
                                style={{ cursor: "pointer" }}
                              />
                            </td>
                          )}
                        </tr>
                      );
                    })
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

export default AdminComments;
