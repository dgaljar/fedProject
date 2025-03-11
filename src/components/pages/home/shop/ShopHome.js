import React from "react";
import "./Shop.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShopHero from "./ShopHero";
import ShopCategories from "./ShopCategories";
import ShopProduct from "./ShopProducts";
import ShopFooter from "./ShopFooter";
import ShopSingleCategory from "./ShopSingleCategory";

const ShopHome = () => {
  return (
    <>
      <header className="shopnav">
        <div className="container-fluid">
          <h4>
            Free shipping on all orders above $200! For a limited time only.
          </h4>
        </div>
        <nav className="navbar navbar-expand-lg ">
          <div className="container justify-content-between">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav align-items-center ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">
                    Shop
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category">
                    Categories
                  </Link>
                </li>

                <li className="nav-item">
                  <span className="nav-link seperator"></span>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/authors">
                    Authors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <section className="shopHero my-5 py-5">
        <div className="container">
          <div className="row">
            <ShopHero />
          </div>
        </div>
      </section>

      <section className="shopCategories my-5 py-5">
        <ShopCategories />
      </section>

      <section className="shopNewProducts mt-5">
        <div className="container">
          <div className="row">
            <div className="productheading d-flex align-items-center justify-content-between mb-5">
              <h2>New products!</h2>
              <a href="#">BROWSE ALL PRODUCTS</a>
            </div>
          </div>
          <div className="row">
            <ShopProduct />
          </div>
        </div>
      </section>

      <ShopSingleCategory cat="smartphones" limit="10" />

      <ShopSingleCategory cat="furniture" limit="10" />

      <ShopSingleCategory cat="vehicle" limit="8" />

      <ShopFooter />
    </>
  );
};

export default ShopHome;
