import React from "react";
import "./Shop.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const ShopHero = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <div className="d-flex flex-column align-items-center justify-content-center text-center shopHeroCard">
              <h1>Tagline describing your e-shop</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                cumque laborum animi deleniti totam dolorem.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <a href="#" className="shopBtnDark">
                  Shop Sales
                </a>
                <a href="#" className="shopBtnLight">
                  All products
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex flex-column align-items-center justify-content-center text-center shopHeroCard">
              <h1>Second Tagline describing your e-shop</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                cumque laborum animi deleniti totam dolorem.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <a href="#" className="shopBtnDark">
                  Shop Sales
                </a>
                <a href="#" className="shopBtnLight">
                  All products
                </a>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default ShopHero;
