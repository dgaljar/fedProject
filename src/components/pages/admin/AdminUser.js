import React, { useEffect, useState, useContext } from "react";
import { searchUsers } from "../../services/api";
import { Link } from "react-router-dom";
import AuthContext from "../users/context/AuthProwider";
import Pagination from "../../services/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCheck,
  faMagnifyingGlass,
  faTrashCan,
  faPenToSquare,
  faChevronDown,
  faSort,
  faC,
  faPen,
} from "@fortawesome/free-solid-svg-icons";


const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [count, setCount] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      });
  }, [count]);

  const deleteUser = async (userId) => {
    if (!window.confirm(`Delete user ${userId}?`)) return;

    try {
      const response = await fetch(
        `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/users/${userId}?reassign=1&force=true`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      alert("Error deleting user.");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    if (!window.confirm("Are you sure you want to delete selected users?"))
      return;

    for (const userId of selectedUsers) {
      await deleteUser(userId);
    }
    setSelectedUsers([]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handlePageClick = (pageNumber) => {
    //kada kliknemo na broj updatea se count i fetcha se nova stranica
    setCount(pageNumber);
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
      <div className="container-fluid content mt-4">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="user-card">
              <h3>Current Users</h3>
              <span>{totalUsers}</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="user-card">
              <h3>New Users</h3>
              <span className="user-percent"></span>
              user bar
            </div>
          </div>
          <div className="col-md-4"></div>
          <h3>Users</h3>
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
            <button className="btn btn-primary">Create User</button>
            <button
              className="btn btn-danger ms-3"
              onClick={handleBulkDelete}
              disabled={selectedUsers.length === 0}
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
                          selectedUsers.length === users.length &&
                          users.length > 0
                        }
                      />
                      <i className="fa-solid fa-chevron-down checkboxarrow"></i>
                    </th>
                    <th colSpan="10"></th>
                  </tr>
                  <tr className="row2">
                    <th></th>
                    <th>
                      ID
                      <a href="#">
                        <FontAwesomeIcon icon={faSort} />
                      </a>
                    </th>
                    <th className="text-center">AVATAR</th>
                    <th>
                      NAME
                      <a href="#">
                        <FontAwesomeIcon icon={faSort} />
                      </a>
                    </th>
                    <th>
                      EMAIL
                      <a href="#">
                        <FontAwesomeIcon icon={faSort} />
                      </a>
                    </th>
                    <th className="text-center">ADMIN</th>
                    <th colSpan="4"></th>
                  </tr>
                </thead>

                <tbody>
                  {!loading ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td className="text-start">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                          />
                        </td>
                        <td className="primary fw-bold">{user.id}</td>
                        <td className="text-center">
                          <img src={user.avatar_urls["24"]} alt="" />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.acf.api_user_email}</td>
                        <td className="text-center">
                          {user.acf.api_user_roles?.includes(
                            "administrator"
                          ) ? (
                            <FontAwesomeIcon icon={faCheck} className="green" />
                          ) : (
                            <FontAwesomeIcon icon={faXmark} className="red" />
                          )}
                        </td>
                        {auth.role === "administrator" && (
                          <>
                            <td className="px-3 px-md-0">
                              <Link to={`/admin/users/${user.id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </Link>
                            </td>
                            <td className="px-3 px-md-0">
                              <button
                                className="functionButtons"
                                onClick={() => deleteUser(user.id)}
                              >
                                <FontAwesomeIcon icon={faTrashCan} className="red" />
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
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

export default AdminUser;
