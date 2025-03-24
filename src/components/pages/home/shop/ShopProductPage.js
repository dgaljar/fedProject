import React, { useEffect, useState } from "react";
import "./Shop.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const ShopProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/` + id)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <section className="productPage">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex">
                <a href="#">All Products&gt;</a>
                <a href="#">{product.category}</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <img src={product.images[0]} alt="img" />
            </div>
            <div className="col-md-4">
              <div className="d-flex flex-column">
                <div className="prodTitleContainer">
                  <div className="prodTitle">
                    <h3>{product.title}</h3>
                    <span>{product.description}</span>
                  </div>
                  <FontAwesomeIcon icon={faHeart} color={"#AAAAAA"} />
                </div>
                <div className="prices">
                  <span>{product.price}$</span>
                  <span>
                    {(product.price - (product.price * 25) / 100).toFixed(2)}$
                    exlc. tax
                  </span>
                </div>
                <div>
                  {[...Array(5)].map((star, index) => {
                    const current = index + 1;
                    return (
                      <>
                        <FontAwesomeIcon
                          icon={faStar}
                          color={current < product.rating ? "gold" : ""}
                        />
                      </>
                    );
                  })}
                </div>
                <div className="productColor">
                  <div className="d-flex flex-column">
                    <span>Color:</span>
                    <strong>Black</strong>
                  </div>
                  <a href="#">Change</a>
                </div>
                <button className="shopBtnDark">
                  <FontAwesomeIcon icon={faCartShopping} /> ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopProductPage;
