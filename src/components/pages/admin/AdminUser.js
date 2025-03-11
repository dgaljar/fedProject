import React, { useEffect, useState, useContext } from "react";
import { searchUsers } from "../../services/api";
import { Link } from "react-router-dom";
import AuthContext from "../users/context/AuthProwider";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const { auth } = useContext(AuthContext);

  const getToken = async () => {
    const response = await fetch(
      "https://frontend.internetskimarketing.eu/backend/wp-json/jwt-auth/v1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "",
          password: "",
        }),
      }
    );

    const data = await response.json();
    if (data.token) {
      console.log("Token:", data.token);
      return data.token;
    } else {
      console.error("Error:", data);
    }
  };

  useEffect(() => {
    fetch(
      `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/users?per_page=10&page=${count}`
    )
      .then((response) => {
        const totalUsersHeader = response.headers.get("X-WP-Total");
        setTotalUsers(totalUsersHeader ? Number(totalUsersHeader) : 0);
        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        setTotalPages(totalPagesHeader ? Number(totalPagesHeader) : 1);
        return response.json();
      })
      .then((data) => {
        console.log(data); // Check the data structure
        setUsers(data);
      });
  }, [count]);

  const deleteUser = async (userId) => {
    const token = await getToken(); // ✅ Ensure authentication

    if (!token) {
      console.error("No valid token received");
      return;
    }

    // ✅ Confirmation prompt before deleting
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user ${userId}?`
    );
    if (!confirmDelete) return; // If user clicks "Cancel", exit function

    try {
      const response = await fetch(
        `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/users/${userId}?reassign=1&force=true`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send auth token
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`User ${userId} deleted successfully!`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // ✅ Remove user from UI
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
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

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchUsers(searchQuery);
      setUsers(searchResults); // Fix: Use correct response format
    } catch (err) {
      setError("Failed to search users...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div class="container-fluid content mt-4">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="user-card">
              <h3>Current User</h3>
              <img src="" alt="" />
              <span>{totalUsers}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="user-card">
              <h3>New Users</h3>
              <span class="user-percent"></span>
              user bar
            </div>
          </div>
          <div class="col-md-4"></div>
          <h3>Users</h3>
          <div class="col-md-6 d-flex align-items-center">
            <div class="adminsearchbar">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="adminsearchinput"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div class="col-md-6 text-md-end">
            <button class="btn btn-primary">Create User</button>
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
                    <th colspan="10"></th>
                  </tr>
                  <tr class="row2">
                    <th> </th>
                    <th>
                      ID{" "}
                      <a href="#">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th class="text-center">AVATAR</th>
                    <th>
                      NAME{" "}
                      <a href="#">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>
                      EMAIL{" "}
                      <a href="#">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th class="text-center">ADMIN</th>
                    <th colspan="4"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return (
                      <tr>
                        <td class="text-start">
                          <input type="checkbox" />
                        </td>
                        <td class="primary fw-bold">{user.id}</td>
                        <td class="text-center">
                          <img src={user.avatar_urls["24"]} alt="" />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.acf.api_user_email}</td>
                        <td class="text-center">
                          {user.acf.api_user_roles?.includes(
                            "administrator"
                          ) ? (
                            <i class="fa-regular fa-circle-check green"></i>
                          ) : (
                            <i class="fa-regular fa-circle-xmark red"></i>
                          )}
                        </td>{" "}
                        {/* edit user */}
                        {auth.role === "administrator" ? (
                          <td class="px-3 px-md-0">
                            <Link to={`/admin/users/${user.id}`}>
                              <i class="fa-regular fa-pen-to-square"></i>
                            </Link>
                          </td>
                        ) : (
                          <></>
                        )}
                        {auth.role === "administrator" ? (
                          <td class="px-3 px-md-0">
                            <button
                              className="functionButtons"
                              onClick={() => deleteUser(user.id)}
                            >
                              <i class="fa-regular fa-trash-can"></i>
                            </button>
                          </td>
                        ) : (
                          <></>
                        )}
                      </tr>
                    );
                  })}
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

export default AdminUser;
