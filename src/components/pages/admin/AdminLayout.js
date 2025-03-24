import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Admin.css";
import AuthContext from "../users/context/AuthProwider";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faChartLine, faList, faComments, faUsers, faSignInAlt, faCog } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

const AdminLayout = () => {
  const [isActive, setIsActive] = useState(false);
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    // Dynamically load Admin.css
    import("./Admin.css");

    // Add a class to body for admin pages
    document.body.classList.add("admin-page");

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("admin-page");
    };
  }, [location]);

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    fetch("https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/users/"+ auth.id)
    .then(response => response.json())
    .then(data => setUser(data));
  }, [])

  const toggleActive = (index, e) => {
    e.preventDefault();
    if (isActive === index) {
      setIsActive(null);
    } else {
      setIsActive(index);
    }
  };

  if (!auth.role) {
    return <Navigate to="/" />;
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
  }
  console.log(auth.pic)
  return (
    <>
      <nav>
        <div className="container-fluid">
          <div className="row p-1 justify-content-between align-items-center order-1">
            <div className="logo col-6">
              <Link to="/">Home</Link>
            </div>
            <div className="active-user col-md-6 col-12 text-start text-md-end order-3">
              <ul className="d-flex justify-content-md-end align-items-center">
                <li>
                  <Link to="/admin/cs">
                    <FontAwesomeIcon icon={faBell} className="bell position-relative animate__animated animate__swing" />
                  </Link>
                </li>
                <li>
                  <img
                    className="profile-img"
                    src={user.avatar_urls?.[48] || "https://placehold.co/40x40"}
                    alt="placeholder"
                  />
                </li>
                <li className="user-menu">
                  <a
                    href="#"
                    className="sub-toggler"
                    onClick={(e) => toggleActive(3, e)}
                  >
                    {auth.user} <FontAwesomeIcon icon={faAngleDown} />
                  </a>
                  <ul
                    className={`dropmenu text-start sidebar-subnav ${
                      isActive === 3 ? "show" : ""
                    }`}
                  >
                    <li>
                      <Link to={"/admin/users/" + auth.id}>Profile</Link>
                    </li>
                    <li>
                      <a href="#" onClick={logout}>Log Out</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="d-md-none d-flex justify-content-end col-6 order-2">
              <button
                className={`d-block ham_btn ${toggle ? "active" : ""}`}
                onClick={toggleSidebar}
              >
                <span className="hamburger">
                  <span className="line"></span>
                  <span className="line"></span>
                  <span className="line"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="mainbody d-flex flex-md-row flex-column">
        <div className={`sidebar ${toggle ? "show" : ""}`}>
          <ul className="sidebar-nav">
            <li>
              <Link to="/admin/cs">
                <FontAwesomeIcon icon={faChartLine} className="me-2" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/categories">
                <FontAwesomeIcon icon={faList} className="me-2" /> Categories
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="sub-toggler d-flex justify-content-between"
                onClick={(e) => toggleActive(0, e)}
              >
                <span>
                  <FontAwesomeIcon icon={faSignInAlt} className="me-2" /> Posts
                </span>
                <FontAwesomeIcon icon={faAngleDown} />
              </Link>
              <ul className={`sidebar-subnav ${isActive === 0 ? "show" : ""}`}>
                <li className="submenu-item">
                  <Link to="/admin/posts">View All Posts</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/admin/posts/add">Add Post</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/admin/comments">
                <FontAwesomeIcon icon={faComments} className="me-2" /> Comments
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="sub-toggler d-flex justify-content-between"
                onClick={(e) => toggleActive(1, e)}
              >
                <span>
                  <FontAwesomeIcon icon={faUsers} className="me-2" /> Users
                </span>
                <FontAwesomeIcon icon={faAngleDown} />
              </Link>
              <ul className={`sidebar-subnav ${isActive === 1 ? "show" : ""}`}>
                <li className="submenu-item">
                  <Link to="/admin/users">View All Users</Link>
                </li>
                {auth.role === "administrator" ? (
                  <li className="submenu-item">
                    <Link to="/admin/users/add">Add User</Link>
                  </li>
                ) : (
                  <li className="submenu-item">
                    <span>Add User (Restricted)</span>
                  </li>
                )}
              </ul>
            </li>
            <li>
              <Link to="/admin/cs">
                <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
              </Link>
            </li>
          </ul>
        </div>
        <Outlet /> {/* Render the nested routes here */}
      </div>
    </>
  );
};

export default AdminLayout;
