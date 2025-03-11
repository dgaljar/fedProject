import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "./Shop.css";

const ShopFooter = () => {
  return (
    <>
      <section className="footer1">
        <div className="container ">
          <div className="row  py-4justify-content-center align-items-center discount">
            <div className="col-md-6">
              <h2>Grab an extra 5% discount</h2>
              <p>
                Subscribe to monthly newsletter. Get the latest product updates
                and special offers delivered right to your inbox.
              </p>
            </div>
            <div className="col-md-6">
              <form>
                <div className="d-flex gap-3">
                  <input type="text" />
                  <button className="shopBtnDark">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="footer2 my-5 py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="d-flex flex-column text-center">
                <h2>Our rating</h2>
                <div className="stars d-flex gap-2 justify-content-center">
                  {[...Array(5)].map((star, index) => {
                    const current = index + 1;
                    return (
                      <>
                        <FontAwesomeIcon
                          icon={faStar}
                          color={current < 5 ? "gold" : ""}
                        />
                      </>
                    );
                  })}
                </div>
                <span>
                  Based on <u>2303 reviews</u>
                </span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex flex-column text-center">
                <div className="stars d-flex gap-2 justify-content-center mb-3">
                  {[...Array(5)].map((star, index) => {
                    const current = index + 1;
                    return (
                      <>
                        <FontAwesomeIcon
                          icon={faStar}
                          color={current <= 5 ? "gold" : ""}
                        />
                      </>
                    );
                  })}
                </div>
                <h4>Greatt value and qualiuty</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Consequatur, corrupti!
                </p>
                <span>BJone DOe, 6 days ago</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex flex-column text-center">
                <div className="stars d-flex gap-2 justify-content-center mb-3">
                  {[...Array(5)].map((star, index) => {
                    const current = index + 1;
                    return (
                      <>
                        <FontAwesomeIcon
                          icon={faStar}
                          color={current <= 5 ? "gold" : ""}
                        />
                      </>
                    );
                  })}
                </div>
                <h4>Greatt value and qualiuty</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Consequatur, corrupti!
                </p>
                <span>BJone DOe, 6 days ago</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex flex-column text-center">
                <div className="stars d-flex gap-2 justify-content-center mb-3">
                  {[...Array(5)].map((star, index) => {
                    const current = index + 1;
                    return (
                      <>
                        <FontAwesomeIcon
                          icon={faStar}
                          color={current <= 5 ? "gold" : ""}
                        />
                      </>
                    );
                  })}
                </div>
                <h4>Greatt value and qualiuty</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Consequatur, corrupti!
                </p>
                <span>BJone DOe, 6 days ago</span>
              </div>
            </div>
          </div>

        </div>

       
      </section>

      <section className="footer3">
        <div className="container position-relative">
          <div className="chat">
            <Link to="#">
            <FontAwesomeIcon icon={faComment} color={"white"} />
            </Link>
          </div>
          <div className="row">
            <h1>RADNOM TEXT</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopFooter;
