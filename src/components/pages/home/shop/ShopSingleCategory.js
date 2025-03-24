import React, { useEffect, useState } from "react";
import "./Shop.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ShopSingleProduct from "./ShopSingleProduct";

const ShopSingleCategory = ({cat, limit}) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${cat}?limit=${limit}`)
      .then((response) => response.json())
      .then((data) => setProduct(data.products));
  }, []);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
    <section className="shopNewProducts mt-5">
        <div className="container">
            <div className="row">
                <div className="productheading d-flex align-items-center justify-content-between mb-5">
                    <h2>{cat}</h2>
                    <a href="#">BROWSE ALL PRODUCTS</a>
                </div>
            </div>
            <div className="row">
      <div className="slider-container">
        <Slider {...settings}>
          {product.map((product) => {
            return (
              // <div key={product.id}>
              //   <div className="shopproductcard">
              //     <img src={product.thumbnail} alt="" />

              //     <div className="shopproductdesc d-flex flex-column justify-content-between">
              //       <div>
              //       <h2>{truncatedTitle}</h2>
              //       <p>{truncatedDesc}</p>
              //       </div>

              //       <span>{product.price}$</span>
              //     </div>
              //   </div>
              // </div>
              <ShopSingleProduct product={product} />
            );
          })}
        </Slider>
      </div>
      </div>
        </div>
      </section>

    </>
  );
};

export default ShopSingleCategory;
