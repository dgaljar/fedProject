import React, { useState, useRef } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {

  const form = useRef();
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    
    if (!captchaValue) {
      alert("Please complete the CAPTCHA first!");
      return;
    }

    emailjs
      .sendForm('service_x456jqo', 'template_04vdy4q', form.current, {
        publicKey: '15yddXDGFOwEIMyzL',
      })
      .then(() => {
          console.log('SUCCESS!');
          setSuccess(true);
      })
      .catch((error) => {
          console.log('FAILED...', error.text);
      });
  };

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
              <form ref={form} onSubmit={sendEmail}>
                <div className="row">
                  <div className="col-md-6 mb-md-4">
                    <label htmlFor="firstName">First Name</label>
                    <input name="first_name" type="text" id="firstName" className="text-input" placeholder="Ivan" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName">Last name</label>
                    <input name="last_name" type="text" id="lastName" className="text-input" placeholder="Srna"/>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" id="email" className="text-input" placeholder="elektronska.posta@posta.hr"/>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone">Phone Number</label>
                    <input name="phone_number" type="tel" id="phone" className="text-input" placeholder="+385 98 225 883" />
                  </div>
                  <div className="col-12 mt-5 mb-5 ">
                    <h3>Select Subject</h3>
                    <div className="d-md-flex">
                      <label className="checkcontainer">
                        General Inquiry 4
                        <input name="subject" type="radio"  value="1"/>
                        <span className="radiobtn"></span>
                      </label>
                      <label className="checkcontainer">
                        General Inquiry 3
                        <input name="subject" type="radio" value="2" />
                        <span className="radiobtn"></span>
                      </label>
                      <label className="checkcontainer">
                        General Inquiry 2
                        <input name="subject" type="radio" value="3" />
                        <span className="radiobtn"></span>
                      </label>
                      <label className="checkcontainer">
                        General Inquiry 1
                        <input name="subject" type="radio" value="4" />
                        <span className="radiobtn"></span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12 mb-5">
                    <label className="message" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      type="text"
                      className="text-input resize"
                      placeholder="Write your message"
                    ></textarea>
                  </div>

                  {!showRecaptcha ? (
                    <button type="button" className="btn ms-auto" onClick={() => setShowRecaptcha(true)}>
                      Send Message
                    </button>
                  ) : (
                    <div className="col-12 text-center">
                      <ReCAPTCHA
                        sitekey={process.env.REACT_APP_CAPTCHA_BUILD} // Replace with your reCAPTCHA site key
                        onChange={(value) => setCaptchaValue(value)}
                      />
                      {captchaValue && (
                        <button type="submit" className={`btn ms-auto mt-3 ${success ? "success" : ""}`} disabled={success  ? true : false}>
                          {!success ? "Submit" : "Message Sent"}
                        </button>
                      )}
                    </div>
                  )}

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
