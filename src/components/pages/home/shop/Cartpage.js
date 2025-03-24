import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan} from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  // const totalPrice = () => {
  //   let total = 0;
  //   cart.forEach((item) => {
  //     total = total + item.price * item.quanitity;
  //   });
  //   return total;
  // }
  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const removeItem = (id) => {
    if(window.confirm("Are you sure you want to remove this item?")) {
      const newCart = cart.filter((item) => item.id !== id )
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
    }
  }

  const increase = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  const decrease = (id) => {
    const updatedCart = cart
    .map((item) => 
    item.id === id ? {...item, quantity: item.quantity - 1} : item)
    .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  

  return (
    <>
      <div className="container py-5">
    <h1 className="mb-5">Your Shopping Cart</h1>
    <div className="row">
        <div className="col-lg-8">
            <div className="card mb-4">
                <div className="card-body">
                   {cart.map((item) => (
                     <div className="row cart-item mb-3" key={item.id}>
                     <div className="col-md-3">
                         <img src={item.thumbnail} alt={item.title} className="img-fluid rounded" />
                     </div>
                     <div className="col-md-5">
                         <h5 className="card-title">{item.title}</h5>
                         <p className="text-muted">{item.category}</p>
                     </div>
                     <div className="col-md-2">
                         <div className="input-group">
                             <button onClick={() => decrease(item.id)} className="btn ligthblue btn-outline-secondary btn-sm" type="button">-</button>
                             <input max-width={"100px"} type="text" className="form-control  form-control-sm text-center quantity-input" value={item.quantity} readOnly  />
                             <button onClick={() => increase(item.id)} className="btn ligthblue btn-outline-secondary btn-sm" type="button">+</button>
                         </div>
                     </div>
                     <div className="col-md-2 text-end">
                         <p className="fw-bold">${(item.price * item.quantity).toFixed(2)}</p>
                         <button onClick={() => removeItem(item.id)} className="btn btn-danger">
                        <FontAwesomeIcon icon={faTrashCan} />
                             </button>
                     </div>
                 </div>
                   ))}
                    <hr />
                </div>
            </div>
     
            <div className="text-start mb-4">
                <a href="#" className="btn ligthblue btn-outline-primary">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />Continue Shopping
                </a>
            </div>
        </div>
        <div className="col-lg-4">

            <div className="card cart-summary">
                <div className="card-body">
                    <h5 className="card-title mb-4">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Subtotal</span>
                        <span>${(totalPrice()-(totalPrice()*0.25)).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Shipping</span>
                        <span>$0</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Tax</span>
                        <span>${(totalPrice()*0.25).toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-4">
                        <strong>Total</strong>
                        <strong>${totalPrice().toFixed(2)}</strong>
                    </div>
                    <button className="btn ligthblue btn-primary w-100">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div>
      
    </>
  );
};

export default CartPage;
