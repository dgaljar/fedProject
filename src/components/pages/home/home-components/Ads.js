import React from "react";
import "./Ads.css";

const Ads = () => {
  return (
    <>
      <section className="ads">
        <div className="container d-flex justify-content-center">
          <div className="addplace text-center">
            {/* <span>Advertisment</span>
            <p>You can place ads</p>
            <span>750x100</span> */}
            <img src="https://placehold.co/750x100?text=Ad+Placeholder" alt="ad placeholder" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Ads;
