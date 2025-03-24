import React from "react";
import "./LoadingHero.css";

const LoadingHero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <img className="heroimg pulsing" src="https://placehold.co/600x400?text=Loading..."/>
          <div className="col-md-6">
            <div className="hero-card">
              <a className="btn dashbtn" href="/">
                Technology
              </a>
              <a href="/">
                <h1 className="dashh1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt molestiae blanditiis fugiat, id veniam!</h1>
              </a>
              <span>
                <img
                  className="profile-img"
                  src="https://placehold.co/600x400?text=Loading..."
                  width="36px"
                  height="36px"
                />
                <span className="heroname dash">NameName</span>
                <span className="herodate dash">20/20/2022</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoadingHero;
