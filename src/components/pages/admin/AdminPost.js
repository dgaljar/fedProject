import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../users/context/AuthProwider";

const AdminPost = () => {
  const { auth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [totalPosts, setTotalPosts] = useState(null);
  const [count, setCount] = useState(1);
  useEffect(() => {
    const fetchPosts = async () => {
      let url =
        auth.role === "administrator"
          ? `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts?per_page=10&page=${count}&_embed`
          : `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts?per_page=10&page=${count}&_embed&author=${auth.id}`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch posts");
  
        const totalUsersHeader = response.headers.get("X-WP-Total");
        setTotalPosts(totalUsersHeader ? Number(totalUsersHeader) : 0);
  
        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        setTotalPages(totalPagesHeader ? Number(totalPagesHeader) : 1);
  
        const data = await response.json();
        if (data.length === 0) {
          setPosts(null); // No posts available
        } else {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts(null);
      }
    };
  
    fetchPosts();
  }, [count, auth.role, auth.id]);
  

  const truncateText = (text, limit = 100) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

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

  return (
    <>
      <div class="container-fluid content mt-4">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="user-card">
              <h3>Active Posts</h3>
              <img src="" alt="" />
              <span>{totalPosts}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="user-card">
              <h3>Pending Posts</h3>
              <span class="user-percent"></span>
              user bar
            </div>
          </div>
          <div class="col-md-4"></div>
          <h3>Posts</h3>
          <div class="col-md-6 d-flex align-items-center">
            <div class="adminsearchbar">
              <input
                type="text"
                class="adminsearchinput"
                placeholder="Search"
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div class="col-md-6 text-md-end">
            <button class="btn btn-primary">Create Post</button>
          </div>
          <div class="col-12">
            <div class="scroller">
              <table>
                <thead>
                  <tr>
                    <th class="text-start checkbox">
                      <input type="checkbox" />
                      <i class="fa-solid fa-chevron-down checkboxarrow"></i>
                    </th>
                    <th colspan="8"></th>
                  </tr>
                  <tr class="row2">
                    <th> </th>
                    <th>
                      ID{" "}
                      <a href="#">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>
                      Publish Date{" "}
                      <a href="#">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>
                      Comments{" "}
                      <a href="#">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>
                      Views{" "}
                      <a href="#">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>
                      Status{" "}
                      <a href="#">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th class="text-center">Delete</th>
                    <th class="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {posts ? (
                     posts.map((post) => {
                      const truncatedTitle = truncateText(
                        post?.title?.rendered,
                        25
                      );
                      const truncatedName = truncateText(
                        post._embedded.author[0].name,
                        25
                      );
                      const formattedDate = new Date(
                        post.date
                      ).toLocaleDateString("en-GB");
                      return (
                        <tr key={post.id}>
                          <td class="text-start">
                            <input type="checkbox" />
                          </td>
                          <td>{post.id}</td>
                          <td
                            dangerouslySetInnerHTML={{ __html: truncatedTitle }}
                          ></td>
                          <td>{truncatedName}</td>
                          <td>{post._embedded["wp:term"][0][0].name}</td>
                          <td>{formattedDate}</td>
                          <td>250</td>
                          <td>1205</td>
                          <td>Published</td>
                          <td class="text-center">
                            <a href="#">
                              <i class="fa-solid fa-trash-can red"></i>
                            </a>
                          </td>
                          <td class="text-center">
                            <a href="edit-post.html">
                              <i class="fa-solid fa-pen-to-square "></i>
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  ) : <tr><td colspan={11} className="text-center">No posts</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default AdminPost;
