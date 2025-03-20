import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShopFooter from "./ShopFooter";
import { QRCode } from "./QRCode";

const ShopCheckout = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalQunatity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    adress: "",
    adress2: "",
    country: "",
    zip: "",
    sameAdress: false,
    saveInfo: false,
    payment: "",
    namnOnCard: "",
    creditCardNumber: "",
    expiration: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form)

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

      <section className="checkoutSection mt-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">
                  {totalQunatity()}
                </span>
              </h4>
              <ul className="list-group mb-3">
                {cart.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">{item.title}</h6>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <span className="text-muted">
                      ${item.price * item.quantity}
                    </span>
                  </li>
                ))}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${totalPrice().toFixed(2)}</strong>
                </li>
              </ul>

              <form className="card p-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="SIR PLEASE DO NOT REDEEM"
                  />
                  <button disabled type="submit" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" noValidate>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      name="firstName"
                      onChange={handleChange}
                      value={form.firstName}
                      required=""
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      name="lastName"
                      onChange={handleChange}
                      value={form.lastName}
                      required=""
                    />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">@</span>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        value={form.username}
                        placeholder="Username"
                        required=""
                      />
                      <div className="invalid-feedback">
                        Your username is required.
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={form.email}
                      placeholder="you@example.com"
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="adress"
                      onChange={handleChange}
                      value={form.adress}
                      placeholder="1234 Main St"
                      required=""
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address2" className="form-label">
                      Address 2 <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                      name="adress2"
                      onChange={handleChange}
                      value={form.adress2}
                      placeholder="Apartment or suite"
                    />
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <select
                      className="form-select"
                      id="country"
                      name="country"
                      onChange={handleChange}
                      value={form.country}
                      required=""
                    >
                      <option value="">Choose...</option>
                      <option value="United States">United States</option>
                      <option value="Croatia">Croatia</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder=""
                      name="zip"
                      onChange={handleChange}
                      value={form.zip}
                      required=""
                    />
                    <div className="invalid-feedback">Zip code required.</div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="same-address"
                    name="sameAdress"
                    checked={form.sameAdress}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.checked })
                    }
                  />
                  <label className="form-check-label" htmlFor="same-address">
                    Shipping address is the same as my billing address
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="save-info"
                    name="saveInfo"
                    checked={form.saveInfo}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.checked })
                    }
                  />
                  <label className="form-check-label" htmlFor="save-info">
                    Save this information for next time
                  </label>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3">Payment</h4>

                <div className="my-3">
                  <div className="form-check">
                    <input
                      id="credit"
                      name="payment"
                      onChange={handleChange}
                      value="Credit card"
                      checked={form.payment === "Credit card"}
                      type="radio"
                      className="form-check-input"
                      required=""
                    />
                    <label className="form-check-label" htmlFor="credit">
                      Credit card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                        id="credit"
                        name="payment"
                        onChange={handleChange}
                        value="Debit card"
                        checked={form.payment === "Debit card"}
                        type="radio"
                        className="form-check-input"
                        required=""
                />
                    <label className="form-check-label" htmlFor="debit">
                      Debit card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="paypal"
                      name="payment"
                      onChange={handleChange}
                      value="paypal"
                      checked={form.payment === "paypal"}
                      type="radio"
                      className="form-check-input"
                      required=""
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>

                <div className="row gy-3">
                  <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">
                      Name on card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      name="nameOnCard"
                      onChange={handleChange}
                      value={form.nameOnCard}
                      placeholder=""
                      required=""
                    />
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                    <div className="invalid-feedback">Name on card is required</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">
                      CC Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-number"
                      name="creditCardNumber"
                      onChange={handleChange}
                      value={form.CreditcardNumber}
                      placeholder=""
                      required=""
                    />
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">
                      Expiration
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-expiration"
                      name="expiration"
                      onChange={handleChange}
                      value={form.expiration}
                      placeholder=""
                      required=""
                    />
                    <div className="invalid-feedback">Expiration date required</div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-cvv"
                      name="cvv"
                      onChange={handleChange}
                      value={form.cvv}
                      placeholder=""
                      required=""
                    />
                    <div className="invalid-feedback">Security code required</div>
                  </div>
                </div>

                <hr className="my-4" />

                <button className="w-100 btn btn-primary btn-lg" type="submit">
                  Continue to checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
        <div className="text-center p-5">
        <QRCode form={form} value={totalPrice().toFixed(2)} />

        </div>

      <ShopFooter />
    </>
  );
};

export default ShopCheckout;
