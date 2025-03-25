import React, {useState} from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";
import Subscribe from "./Subscribe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = ({ darkMode }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };


  if (location.pathname === "/signin" || 
    location.pathname === "/signup"  || 
    location.pathname === "/forgotpassword" ||
    location.pathname.startsWith("/shop")) {
    return;
  }

  return (
    <footer>
      <div className="container position-relative">
        <div className="row">
          <button className="showmore d-block d-md-none" onClick={toggleSidebar}>
            {!open ? "Show more" : "Show less"} <FontAwesomeIcon className={!open ? "" : "rotate"} icon={faChevronDown} />
          </button>
          <div className={`hidden ${open ? "is-open" : ""} col-md-4 d-flex justify-content-center text-center d-md-block text-md-start mb-4 md-md-0`}>
            <div className="inner about-info">
              <h3>About</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
              <div>
                <b>Email</b>: <a href="mailto:info@jstemplate.net">info@jstemplate.net</a>
              </div>
              <div>
                <b>Phone</b>: <a href="tel:+880 123 456 789">880 123 456 789</a>
              </div>
            </div>
          </div> 
          <div className={`hidden col-md-2 ${open ? "is-open" : ""}`}>
            <div className="inner quick-links text-center text-md-start">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/aboutus">About</Link>
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
                <li>
                  <Link to="/exchange">Exchange</Link>
                </li>
                <li>
                  <Link to="/countries">Countries</Link>
                </li>

              </ul>
            </div>
          </div>
          <div className={`hidden col-md-2 ${open ? "is-open" : ""}`}>
            <div className="inner category-links text-center text-md-start">
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
                <Subscribe />
              </div>
            </div>
          </div>
        </div>

        <div className="row bottom align-items-center">
          <div className="col-md-6 gap-3 d-flex justify-content-center align-items-center justify-content-md-start mb-4 mb-md-0">
          <svg
            className={darkMode ? "d-none" : ""}
            width="36"
            height="36"
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
          <svg
            className={darkMode ? "" : "d-none"}
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 22.152 1.40577 25.9756 3.76732 29.021L7.73554 14.0299C9.38672 7.52344 13.6758 4.15725 20.5616 4.15725H22.936C27.7785 4.15725 31.335 8.70307 30.1698 13.4033C29.9609 14.2463 29.5702 15.0334 29.0253 15.7097L27.0045 18.2174C26.486 18.8609 26.2968 19.7092 26.493 20.5121L27.109 23.0338C27.4278 24.339 27.3695 25.708 26.941 26.9814C25.4832 31.3132 21.4227 34.231 16.8521 34.231H10.2086C12.5662 35.3648 15.2089 36 18 36Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.7 21.7592H14.1932C13.0747 21.7592 12.0968 22.5135 11.8129 23.5953L10.4373 28.8354H15.871C17.8811 28.8354 19.6384 27.4799 20.1487 25.5357L20.2666 25.0865C20.7082 23.4043 19.4392 21.7592 17.7 21.7592ZM16.6646 23.3514H14.759C14.1206 23.3514 13.5623 23.7814 13.3993 24.3988L12.6486 27.2432H15.6532C16.7647 27.2432 17.7364 26.4977 18.0186 25.4284L18.0838 25.1814C18.328 24.2562 17.6263 23.3514 16.6646 23.3514Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.9971 11.7427C15.2811 10.6609 16.2589 9.90663 17.3774 9.90663H20.8843C22.6235 9.90663 23.8925 11.5517 23.4509 13.2339L23.333 13.6831C22.8227 15.6273 21.0654 16.9828 19.0553 16.9828H13.6216L14.9971 11.7427ZM16.5836 12.5462C16.7465 11.9289 17.3049 11.4988 17.9433 11.4988H19.8489C20.8106 11.4988 21.5123 12.4036 21.2681 13.3288L21.2029 13.5758C20.9207 14.6451 19.949 15.3907 18.8375 15.3907H15.8329L16.5836 12.5462Z"
              fill="white"
            />
          </svg>
            <div className="text-starts">
              <span>
                Meta<b>Blog</b>
              </span>
              <br />
              <span>© JS Template 2023. All Rights Reserved.</span>
            </div>
          </div>
          <div className="col-md-6">
            <ul className="justify-content-center justify-content-md-end">
              <li className="text-center">
                <a href="https://www.termsfeed.com/live/43a6d8ec-63b9-4282-ab4c-cbd096a12d3b" rel="noreferrer" target="_blank">Terms of Use</a>
              </li>
              <li className="text-center">
                <a href="https://www.termsfeed.com/live/8d9071d5-19c1-4069-8389-d42b31e9b6bd" rel="noreferrer" target="_blank">Privacy Policy</a>
              </li>
              <li className="text-center">
                <a href="https://app.termsfeed.com/download/23157591-6aab-411d-98b5-8c8f97d76978" rel="noreferrer" target="_blank">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
