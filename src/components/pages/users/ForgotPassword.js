import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleReset = () => {
        fetch('https://backend.internetskimarketing.com/?rest_route=/simple-jwt-login/v1/user/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setMessage("Check your email for password reset instructions.");
            } else {
                setMessage("Error: " + data.data.message);
            }
        });
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
              </p>
            </div>
            <img src="img/bgimg.svg" alt="" />
          </div>

          <div className="col-12 col-md-6 login-form justify-content-center px-4 px-md-0">
            <div className="d-flex flex-column gap-5">
                <h2>Forgot Password</h2>
                <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                <button onClick={handleReset}>Reset Password</button>
                {message && <p>{message}</p>}
            </div>

          </div>
        </div>
      </div>
        </>
    );
};

export default ForgotPassword;


