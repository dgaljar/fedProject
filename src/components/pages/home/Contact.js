import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <section className="contact-title mb-4 mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2>Contact Us</h2>
              <span>Any question or remarks? Just write us a message!</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="contact-header">
                <h3>Contact Information</h3>
                <span>Write us a message</span>
              </div>

              <ul className="contact-info">
                <li>
                  <div>
                    <i className="fa-solid fa-phone-volume"></i>
                  </div>
                  <a href="">+1012 3456 789</a>
                </li>
                <li>
                  <div>
                    <i className="fa-regular fa-envelope"></i>
                  </div>
                  <a href="">example@email.com</a>
                </li>
                <li>
                  <div>
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <a href="">
                    132 Dartmouth Street Boston, Massachusetts 02156 United
                    States
                  </a>
                </li>
              </ul>

              <ul className="contact-socials">
                <li>
                  <a href="">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa-brands fa-discord"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-7">
              <form action="">
                <div className="row">
                  <div className="col-md-6 mb-md-4">
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" className="text-input" placeholder="Ivan" />
                  </div>
                  <div className="col-md-6">
                    <label for="lastName">Last name</label>
                    <input type="text" id="lastName" className="text-input" placeholder="Srna"/>
                  </div>
                  <div className="col-md-6">
                    <label for="email">Email</label>
                    <input type="email" id="email" className="text-input" placeholder="elektronska.posta@posta.hr"/>
                  </div>
                  <div className="col-md-6">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" className="text-input" placeholder="+385 98 225 883" />
                  </div>
                  <div className="col-12 mt-5 mb-5 ">
                    <h3>Select Subject</h3>
                    <div className="d-md-flex">
                      <label className="checkcontainer">
                        General Inquiry
                        <input type="radio" name="general" />
                        <span className="radiobtn"></span>
                      </label>
                      <label className="checkcontainer">
                        General Inquiry
                        <input type="radio" name="general" />
                        <span className="radiobtn"></span>
                      </label>
                      <label className="checkcontainer">
                        General Inquiry
                        <input type="radio" name="general" />
                        <span className="radiobtn"></span>
                      </label>
                      <label className="checkcontainer">
                        General Inquiry
                        <input type="radio" name="general" />
                        <span className="radiobtn"></span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12 mb-5">
                    <label className="message" for="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      type="text"
                      className="text-input resize"
                      placeholder="Write your message"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn ms-auto">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
