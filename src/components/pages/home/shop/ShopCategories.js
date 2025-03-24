import React, { useEffect, useState } from "react";
import "./Shop.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ShopCategories = () => {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCat(data));
  }, []);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="container">
        <div className="row">
        <div className="slider-container">
          <Slider {...settings}>
            {cat.map((cat) => {
              return (
                <div key={cat.id}>
                  <div className="shopCategoryCard">
                    <h2>{cat.name}</h2>
                  </div>
                </div>
              );
            })}
          </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCategories;
