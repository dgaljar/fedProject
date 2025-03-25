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

  const isActiveAdmin = (path) => location.pathname === path ? "active-link-admin" : "";

  return (
    <>
      <nav>
        <div className="container-fluid">
          <div className="row p-1 justify-content-between align-items-center order-1">
            <div className="logo col-6">
              <Link to="/">
              <svg
            width="30"
            height="30"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 22.152 1.40577 25.9756 3.76732 29.021L7.73554 14.0299C9.38672 7.52344 13.6758 4.15725 20.5616 4.15725H22.936C27.7785 4.15725 31.335 8.70307 30.1698 13.4033C29.9609 14.2463 29.5702 15.0334 29.0253 15.7097L27.0045 18.2174C26.486 18.8609 26.2968 19.7092 26.493 20.5121L27.109 23.0338C27.4278 24.339 27.3695 25.708 26.941 26.9814C25.4832 31.3132 21.4227 34.231 16.8521 34.231H10.2086C12.5662 35.3648 15.2089 36 18 36Z"
              fill="#141624"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.7 21.7592H14.1932C13.0747 21.7592 12.0968 22.5135 11.8129 23.5953L10.4373 28.8354H15.871C17.8811 28.8354 19.6384 27.4799 20.1487 25.5357L20.2666 25.0865C20.7082 23.4043 19.4392 21.7592 17.7 21.7592ZM16.6646 23.3514H14.759C14.1206 23.3514 13.5623 23.7814 13.3993 24.3988L12.6486 27.2432H15.6532C16.7647 27.2432 17.7364 26.4977 18.0186 25.4284L18.0838 25.1814C18.328 24.2562 17.6263 23.3514 16.6646 23.3514Z"
              fill="#141624"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.9971 11.7427C15.2811 10.6609 16.2589 9.90663 17.3774 9.90663H20.8843C22.6235 9.90663 23.8925 11.5517 23.4509 13.2339L23.333 13.6831C22.8227 15.6273 21.0654 16.9828 19.0553 16.9828H13.6216L14.9971 11.7427ZM16.5836 12.5462C16.7465 11.9289 17.3049 11.4988 17.9433 11.4988H19.8489C20.8106 11.4988 21.5123 12.4036 21.2681 13.3288L21.2029 13.5758C20.9207 14.6451 19.949 15.3907 18.8375 15.3907H15.8329L16.5836 12.5462Z"
              fill="#141624"
            />
          </svg>
              </Link>
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
                <span className="adminhamburger">
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
              <Link to="/admin/cs" className={`${isActiveAdmin("/admin/cs")}`}>
                <FontAwesomeIcon icon={faChartLine} className="me-2" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/categories" className={`${isActiveAdmin("/admin/categories")}`}>
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
                  <Link to="/admin/posts" className={`${isActiveAdmin("/admin/posts")}`} >View All Posts</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/admin/posts/add" className={`${isActiveAdmin("/admin/posts/add")}`}>Add Post</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/admin/comments" className={`${isActiveAdmin("/admin/comments")}`}>
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
                  <Link to="/admin/users" className={`${isActiveAdmin("/admin/users")}`}>View All Users</Link>
                </li>
                {auth.role === "administrator" ? (
                  <li className="submenu-item">
                    <Link to="/admin/users/add" className={`${isActiveAdmin("/admin/users/add")}`}>Add User</Link>
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
