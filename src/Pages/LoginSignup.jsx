import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/LoginSignup.css";
import CustomHelmet from "../Components/Helmet/Helmet";


const LoginSignup = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

   
    if (!name || !email || !password || !agree) {
      toast.error("All fields are required. Please fill in all the details.", {autoClose: 1500,});
      return;
    }

    const apiUrl23 = "https://api.emailjs.com/api/v1.0/email/send";

    const serviceId = "service_c69ugdr";
    const templateId = "template_jxtgkbe";
    const publicKey = "aKVPp41iXUuUwGHK3";

    try {
      setSubmitting(true);

      const templateParams = {
        name: name,
        email: email,
        password: password,
        agree: agree ? "Yes" : "No",
      };

      const data23 = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: templateParams,
      };

      await axios.post(apiUrl23, data23);

      toast.success("Signup successful!", { autoClose: 1500 });
      setName("");
      setEmail("");
      setPassword("");
      setAgree(false);
    } catch (error) {
      console.error("Email failed to send:", error);

      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  const pageTitle = "SHOPPER - Login"

  return (
    <form ref={form} onSubmit={sendEmail} >
      <CustomHelmet title={pageTitle}/>
      <div className="loginsignup">
        <div className="loginsignup-container" data-aos="zoom-in">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" aria-label="Continue" disabled={submitting}>
            Continue
          </button>
          <p className="loginsignup-login">
            Already have an account? <span>Login here</span>
          </p>
          <div className="loginsignup-agree">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginSignup;