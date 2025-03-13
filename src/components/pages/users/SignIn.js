import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProwider";
import { Link, useNavigate } from "react-router-dom";
import "./Users.css";

const SignIn = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // check if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://frontend.internetskimarketing.eu/backend/wp-json/jwt-auth/v1/token`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      setIsLoading(false);

      if (data?.code) {
        setError("Wrong E-mail or Password. Try again");
        return;
      }

      const userRole = data?.user_role || "user"; // Default role if missing
      const userId = data?.user_id || null; // Default to null if not found
      const userEmail = data?.user_email || ""; // Store user email

      // Store in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user_display_name);
      localStorage.setItem("email", userEmail); // Store email
      localStorage.setItem("role", userRole);
      localStorage.setItem("user_id", userId);

      // Update Context
      setAuth({
        token: data.token,
        user: data.user_display_name,
        email: userEmail, // Store email in context
        role: userRole,
        id: userId,
      });

      navigate("/");
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-none d-md-flex col-md-6 login-intro">
          <Link to="/" className="me-md-auto ">
            <img src="img/Logo.png" alt="logo" />
          </Link>

          <div className=" text-center text-md-start">
            <h1>Welcome to MetaBlog!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <img src={`${process.env.PUBLIC_URL}/img/bgimg.svg`} alt="logo" />
        </div>
        <div className="col-12 col-md-6 login-form justify-content-center">
          <div className="mt-5 mt-md-0">
            <h2>Welcome back!</h2>
            <p>Meet the good taste today</p>

            <form className={isLoading ? "loading" : ""} onSubmit={handleLogin}>
              <label>E-mail</label>
              <input
                type="text"
                placeholder="Enter your e-mail"
                className="mb-4"
                name="username"
                onChange={handleChange}
                value={form.username}
                required
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mb-4"
                name="password"
                onChange={handleChange}
                value={form.password}
                required
              />
              <Link to="/" className="forgotpassword">
                Forgot Password?
              </Link>

              {error ? <p className="alert alert-danger">{error}</p> : ""}

              <button type="submit">Sign In</button>
              <p className="seperator">or do it via other accounts</p>
            </form>

            <ul>
              <li>
                <Link to="/">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_0_4466)">
                      <path
                        d="M5.13758 14.5092L4.33065 17.5216L1.38136 17.584C0.499949 15.9491 0 14.0787 0 12.0911C0 10.169 0.46744 8.35647 1.29601 6.7605H1.29664L3.92235 7.24188L5.07256 9.85183C4.83182 10.5537 4.70061 11.3071 4.70061 12.0911C4.7007 12.9419 4.85482 13.7571 5.13758 14.5092Z"
                        fill="#555555"
                      />
                      <path
                        d="M22.9793 9.92529C23.1124 10.6265 23.1818 11.3506 23.1818 12.0906C23.1818 12.9205 23.0945 13.7299 22.9283 14.5107C22.3641 17.1677 20.8897 19.4878 18.8473 21.1296L18.8467 21.129L15.5395 20.9602L15.0714 18.0383C16.4266 17.2435 17.4858 15.9997 18.0437 14.5107H11.8457V9.92529H18.1341H22.9793Z"
                        fill="#555555"
                      />
                      <path
                        d="M18.8462 21.1293L18.8468 21.13C16.8605 22.7266 14.3372 23.6819 11.5904 23.6819C7.17632 23.6819 3.33859 21.2147 1.38086 17.5839L5.13708 14.5092C6.11593 17.1215 8.636 18.9812 11.5904 18.9812C12.8603 18.9812 14.05 18.6379 15.0709 18.0386L18.8462 21.1293Z"
                        fill="#555555"
                      />
                      <path
                        d="M18.9892 3.16844L15.2343 6.24257C14.1777 5.58216 12.9288 5.20066 11.5908 5.20066C8.56951 5.20066 6.00231 7.14562 5.0725 9.85169L1.29653 6.76036H1.2959C3.22497 3.04108 7.11109 0.5 11.5908 0.5C14.4032 0.5 16.9818 1.5018 18.9892 3.16844Z"
                        fill="#555555"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_4466">
                        <rect
                          width="23.1818"
                          height="23.1818"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <svg
                    width="22"
                    height="28"
                    viewBox="0 0 22 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.9724 4.81107C15.9181 3.6703 16.5531 2.08065 16.3797 0.5C15.0197 0.555126 13.3737 1.40564 12.3999 2.54641C11.5251 3.55668 10.7595 5.17333 10.9666 6.72248C12.482 6.84061 14.0312 5.95297 14.9747 4.81107H14.9724ZM18.3748 14.844C18.413 18.9301 21.9617 20.2902 22 20.3082C21.9719 20.4038 21.4348 22.2455 20.1311 24.1479C19.0052 25.7927 17.8366 27.4318 15.9947 27.4656C14.1855 27.4982 13.6045 26.3934 11.5352 26.3934C9.46813 26.3934 8.82189 27.4318 7.10834 27.4982C5.33175 27.5657 3.97847 25.7196 2.84136 24.0815C0.522102 20.729 -1.25112 14.6089 1.13006 10.4778C2.31108 8.42576 4.42543 7.12636 6.71992 7.09374C8.46499 7.05999 10.1121 8.26713 11.1783 8.26713C12.2456 8.26713 14.2474 6.81586 16.3516 7.02849C17.2331 7.06561 19.7055 7.38399 21.2941 9.70716C21.1657 9.78591 18.3432 11.4284 18.3736 14.844"
                      fill="#332218"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <svg
                    width="13"
                    height="26"
                    viewBox="0 0 13 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.70655 25.5V14.4575H0V9.85625H3.70655V6.175C3.70655 2.37125 6.1306 0.5 9.54642 0.5C11.1826 0.5 12.5897 0.62125 13 0.675V4.65H10.6301C8.77239 4.65 8.33943 5.52875 8.33943 6.815V9.85625H12.9711L12.0447 14.4563H8.33943L8.41369 25.5"
                      fill="#555555"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
            <p className="text-center">
              Don't Have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
