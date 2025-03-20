import React from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Footer = ({ darkMode }) => {
  const location = useLocation();

  if (location.pathname === "/signin" || 
    location.pathname === "/signup"  || 
    location.pathname === "/forgotpassword" ||
    location.pathname.startsWith("/shop")) {
    return;
  }

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4 d-flex justify-content-center text-center d-md-block text-md-start mb-4 md-md-0">
            <div className="about-info">
              <h3>About</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
              <div>
                <b>Email</b>: <a href="/">info@jstemplate.net</a>
              </div>
              <div>
                <b>Phone</b>: <a href="/">880 123 456 789</a>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="quick-links text-center text-md-start">
              <h3>Quick Link</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/aboutus">About</Link>
                </li>
                <li>
                  <Link to="/">Arhived</Link>
                </li>
                <li>
                  <Link to="/authors">Author</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <div className="category-links text-center text-md-start">
              <h3>Category</h3>
              <ul>
                <li>
                  <Link to="/category/novosti">News</Link>
                </li>
                <li>
                  <Link to="/category/hrvatska">Croatia</Link>
                </li>
                <li>
                  <Link to="/category/zdravlje">Health</Link>
                </li>
                <li>
                  <Link to="/category/dom-i-vrt">Garden</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center d-md-block">
            <div className="newsletter text-center">
              <div className="newstitle">
                <h3>Weekly Newsletter</h3>
                <span>Get blog articles and offers via email</span>
              </div>
              <form action="">
                <div className="mailinput">
                  <input type="email" placeholder="Your Email" />
                  <FontAwesomeIcon className="lightbulb" icon={faEnvelope} />
                </div>
                <button className="btn">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        <div className="row bottom align-items-center">
          <div className="col-md-6 d-flex justify-content-center align-items-center justify-content-md-start mb-4 mb-md-0">
            <img
              className={`footer-img ${darkMode ? "d-none" : ""}`}
              src={`${process.env.PUBLIC_URL}/img/favicon.png`}
              loading="lazy"
              alt="logo"
            />
            <img
              className={`footer-img ${darkMode ? "" : "d-none"}`}
              src={`${process.env.PUBLIC_URL}/img/Logo.png`}
              loading="lazy"
              alt="logo"
            />
            <div className="text-starts">
              <span>
                Meta<b>Blog</b>
              </span>
              <br />
              <span>© JS Template 2023. All Rights Reserved.</span>
            </div>
          </div>
          <div className="col-md-6">
            <ul className="justify-content-start justify-content-md-end">
              <li className="text-center">
                <a href="/">Terms of Use</a>
              </li>
              <li className="text-center">
                <a href="/">Privacy Policy</a>
              </li>
              <li className="text-center">
                <a href="/">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
