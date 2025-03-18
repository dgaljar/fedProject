import React, { useEffect, useRef, useState, useContext } from "react";
import AuthContext from "../pages/users/context/AuthProwider";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ darkMode, toggleDarkMode }) => {
  const toggleContainerRef = useRef(null);
  const { auth } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const closeSidebar = () => {
    setOpen(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  const location = useLocation();

  if (
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/shop")
  ) {
    return;
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container justify-content-between">
        <Link className="navbar-brand m-0" to="/" aria-label="Home">
          <img
            className={`navbar-img ${darkMode ? "d-none" : ""}`}
            src={`${process.env.PUBLIC_URL}/img/favicon.png`}
            alt=""
            width="48px"
          />
          <img
            className={`navbar-img ${darkMode ? "" : "d-none"}`}
            src={`${process.env.PUBLIC_URL}/img/Logo.png`}
            alt=""
            width="48px"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleSidebar}
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`wrapper ${open ? "is-open" : ""}`}
          id="navbarSupportedContent"
        >
          <div className="inner ms-lg-auto">
            <ul className="navbar-nav align-items-center ms-auto">
              <li className="nav-item" onClick={closeSidebar}>
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item" onClick={closeSidebar}>
                <Link className="nav-link" to="/category">
                  Categories
                </Link>
              </li>

              <li className="nav-item" onClick={closeSidebar}>
                <Link className="nav-link" to="/authors">
                  Authors
                </Link>
              </li>
              <li className="nav-item" onClick={closeSidebar}>
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              {auth.token ? (
                <li className="nav-item" onClick={closeSidebar}>
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              ) : (
                <></>
              )}
              <li className="nav-item" onClick={closeSidebar}>
                {username ? (
                  <button className="nav-link btn btn-nav" onClick={logout}>
                    Logout
                  </button>
                ) : (
                  <Link className="nav-link btn btn-nav" to="/signin">
                    Sign in
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <div
                  className={`toggle-container ${darkMode ? "darklite" : ""}`}
                  ref={toggleContainerRef}
                  onClick={toggleDarkMode}
                >
                  <FontAwesomeIcon
                    className="lightbulb"
                    icon="fa-regular fa-lightbulb"
                  />
                  <FontAwesomeIcon className="moon" icon="fa-regular fa-moon" />
                  <div className="toggle-circle"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
