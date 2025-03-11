import React from "react";
import "./LoadingPost.css";

const LoadingPost = () => {
  return (
    <>
      <div className="col-md-4">
        <div className="post-card">
          <div className="d-flex flex-column">
            <img
              className="postimg overlay"
              src="https://placehold.co/600x400?text=Loading..."
              loading="lazy"
              
            />
            <div className="post-details">
              <a className="btn dashbtn" href="#">
                Technology
              </a>
              <h3 className="dashh3">
                <a href="$">Lorem ipsum dolor sit amet.</a>
              </h3>
            </div>
          </div>
          <div className="post-author">
            <img
              className="profile-img"
              src="https://placehold.co/600x400?text=Loading..."
              loading="lazy"
              width="36px"
              height="36px"
            />
            <div className="namedate">
              <span className="heroname dash">NameName</span>
              <span className="herodate dash">20/20/2022</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingPost;
