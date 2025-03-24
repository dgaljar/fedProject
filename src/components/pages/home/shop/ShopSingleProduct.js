import { useState } from "react";
import React from "react";
import "./Shop.css";
import { Link } from "react-router-dom";

const ShopSingleProduct = ({ product }) => {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    
    // JSON.parse kako bi pretovirli iz stringa u JSON
    // JSON.stringify kako bi pretvorili u string

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        thumbnail: product.thumbnail,
        title: product.title,
        price: product.price,
        category: product.category,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => {
      setAdded(false)
    }, "2000")
    console.log(cart);
  };

  return (
    <>
      <div key={product.id}>
        <div className="shopproductcard">
          <img src={product.thumbnail} alt="" />

          <div className="shopproductdesc d-flex flex-column justify-content-between">
            <div>
              <h2>
                <Link to={`/shop/${product.id}`}>{product.title}</Link>
              </h2>
              <p>{product.description}</p>
            </div>

            <span>{product.price}$</span>
            {!added ? (
              <button onClick={addToCart} className="shopBtnDark">
                Dodaj proizvod
              </button>
            ) : (
              <Link className="shopBtnDark greenText" to="/shop/cart">Pogledaj proizvod</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSingleProduct;
