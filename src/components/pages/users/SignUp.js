import React, { useState, useEffect, useRef } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { credentials } from "../../services/config";
import ReCAPTCHA from "react-google-recaptcha";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const API_BASE_URL = "https://frontend.internetskimarketing.eu/backend/wp-json";

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the CAPTCHA first!");
      return;
    }

    if (!validName || !validPwd || !validMatch) {
      setErrMsg("Invalid Entry");
      return;
    }

    setIsLoading(true);

    try {
      const authResponse = await fetch(`${API_BASE_URL}/jwt-auth/v1/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      if (!authResponse.ok) {
        throw new Error("Admin authentication failed.");
      }

      const authData = await authResponse.json();
      const token = authData.token;

      const registerResponse = await fetch(`${API_BASE_URL}/wp/v2/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: user,
          password: pwd,
          email: email,
          roles: ["subscriber"],
        }),
      });

      if (!registerResponse.ok) {
        throw new Error("User registration failed.");
      }

      setSuccess(true);
    } catch (err) {
      setErrMsg(err.message);
      errRef.current.focus();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="d-none d-md-flex col-md-6 login-intro">
            <Link to="/" className="me-md-auto ">
              <img src="img/Logo.png" alt="logo" />
            </Link>

            <div className=" text-center text-md-start">
              <h1>Welcome to MetaBlog!</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vulputate ut laoreet velit ma.
              </p>
            </div>
            <img src="img/bgimg.svg" alt="" />
          </div>

          <div className="col-12 col-md-6 login-form justify-content-center px-4 px-md-0">
            <div className="mt-4 mt-md-0">
              <h2>Create your account</h2>
              <p>It's free and eays</p>
              {success ? (
                <div className="py-5 my-5 text-center">
                  <h1 className="text-success fs-1 fw-bold">Success!</h1>
                  <Link to="/signin" className="text-decoration-underline">
                    Sign in here.
                  </Link>
                </div>
              ) : (
                <>
                  <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <form
                    className={isLoading ? "loading" : ""}
                    onSubmit={handleSubmit}
                  >
                    <label htmlFor="username">
                      Username:
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validName ? "valid" : "hide"}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validName || !user ? "hide" : "invalid"}
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      id="username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      className="mb-4"
                    />
                    <p
                      id="uidnote"
                      className={
                        userFocus && user && !validName
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      4 to 24 characters.
                      <br />
                      Must begin with a letter.
                      <br />
                      Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <label>E-mail or phone number</label>
                    <input
                      type="text"
                      placeholder="Enter your e-mail or phone number"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mb-4"
                      required
                    />

                    <label htmlFor="password">
                      Password:
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validPwd ? "valid" : "hide"}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validPwd || !pwd ? "hide" : "invalid"}
                      />
                    </label>
                    <input
                      type="password"
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      placeholder="Enter your password"
                    />
                    <p
                      id="pwdnote"
                      className={
                        pwdFocus && !validPwd ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      8 to 24 characters.
                      <br />
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                      Allowed special characters: ! @ # $ %
                    </p>
                    <label htmlFor="confirm_pwd">
                      Confirm Password:
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validMatch && matchPwd ? "valid" : "hide"}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validMatch || !matchPwd ? "hide" : "invalid"}
                      />
                    </label>
                    <input
                      type="password"
                      id="confirm_pwd"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      required
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                      placeholder="Confirm your password"
                    />
                    <p
                      id="confirmnote"
                      className={
                        matchFocus && !validMatch ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must match the first password input field.
                    </p>

                    <label
                      htmlFor=""
                      className="d-flex align-items-start terms"
                    >
                      <input type="checkbox" className="checkbox" />
                      <span>
                        By creating an account means you agree to the{" "}
                        <Link to="/" className="terms-policy">
                          Terms and Conditions
                        </Link>
                        , and our{" "}
                        <Link to="/" className="terms-policy">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    
                    {!showRecaptcha ? (
                      <button disabled={!validName || !validPwd || !validMatch} onClick={() => setShowRecaptcha(true)}>
                      Sign Up
                    </button>
                  ) : (
                    <div className="col-12 text-center">
                      <ReCAPTCHA
                        sitekey="6LeTYvYqAAAAAEAq75bi_aFR2eQET_dhPbj53CPL" // Replace with your reCAPTCHA site key
                        onChange={(value) => setCaptchaValue(value)}
                      />
                      {captchaValue && (
                        <button type="submit" className="mt-2">
                          {!success ? "Submit" : "Message Sent"}
                        </button>
                      )}
                    </div>
                  )}


                  </form>
                </>
              )}

              <p className="seperator">or do it via other accounts</p>

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
                      <g clipPath="url(#clip0_0_4466)">
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
                        fillRule="evenodd"
                        clipRule="evenodd"
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.70655 25.5V14.4575H0V9.85625H3.70655V6.175C3.70655 2.37125 6.1306 0.5 9.54642 0.5C11.1826 0.5 12.5897 0.62125 13 0.675V4.65H10.6301C8.77239 4.65 8.33943 5.52875 8.33943 6.815V9.85625H12.9711L12.0447 14.4563H8.33943L8.41369 25.5"
                        fill="#555555"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
              <p className="text-center">
                Already have an account? <Link to="/signin">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
