import React, { useState } from "react";
import "./Contact.css";
import msg_icon from "../../assets/msg-icon.png";
import mail_icon from "../../assets/mail-icon.png";
import phone_icon from "../../assets/phone-icon.png";
import location_icon from "../../assets/location-icon.png";
import white_arrow from "../../assets/white-arrow.png";
import axios from "axios";

const Contact = () => {
  const [result, setResult] = useState("");
  const [email, setEmail] = useState("");
  const [emailData, setEmailData] = useState(null);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  console.log(email);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "66e46570-5e54-484d-9323-81e4a1e1c73b");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      try {
        await axios.post("/send-email", { email });
        console.log("Email sent successfully");
        setResult("Form Submitted Successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
  };

  console.log(result);

  return (
    <div className="contact" name="contact">
      <div className="contact-col">
        <h3>
          Send us a message <img src={msg_icon} alt="" />
        </h3>
        <p>
          Feel free to reach out through contact form or find our contact
          information below. Your feedback, questions, and suggestions are
          important to us as we strive to provide exceptional service to our
          university community.
          <ul>
            <li>
              <img src={mail_icon} alt="" />
              shashankhey1710@gmail.com
            </li>
            <li>
              <img src={phone_icon} alt="" />
              +1 123-456-7890
            </li>
            <li>
              <img src={location_icon} alt="" />
              77 Massachusetts Ave, Cambridge <br /> MA 02139, United States
            </li>
          </ul>
        </p>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            pattern="[A-Za-z\s]{3,}"
            title="Name must contain only letters and be at least 3 characters long"
            required
          />
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your mobile number"
            pattern="[789][0-9]{9}"
            title="Please enter a valid phone number"
            required
          />
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your mobile number"
            title="Please enter a valid email"
            onChange={handleEmailChange}
            required
          />
          <label>Write your message here</label>
          <textarea
            name="message"
            rows="6"
            placeholder="Enter your message"
            title="Max characters allowed is 500"
            maxLength={500}
            required
          ></textarea>
          <button type="submit" className="btn dark-btn">
            Submit now
            <img src={white_arrow} alt="" />
          </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;

// service_arcygap
// template_hi7eten
