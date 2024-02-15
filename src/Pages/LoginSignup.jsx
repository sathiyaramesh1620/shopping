import React from 'react'
import './CSS/LoginSignup.css'
import emailjs from '@emailjs/browser'
import { useState, useRef } from 'react'





const LoginSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const loginNameRef = useRef();
  const loginEailRef = useRef();
  const loginPasswordRef = useRef();


  const submitHandler = (e) => {
    e.preventDefault();

    const serviceId = 'service_c69ugdr';
    const templateId ='template_5gcykq5';
    const publicKey = 'aKVPp41iXUuUwGHK3';

    const templateParams = {
      from_name: email,
      to_name: text,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
        alert("Email sent successfully!", response)
        setEmail("");
        setText("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });

    setEmail("");
    setText("");

  }
  return (
    <form onSubmit={submitHandler}>
      <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input type="text" placeholder='Your Name'

              required
              ref={loginEailRef}
              onChange={(e) => setEmail(e.target.value)}

            />
            <input type="email" placeholder='Email Address'
              required
              ref={loginNameRef}
              onChange={(e) => setEmail(e.target.value)}

            />
            <input type="password" placeholder='Password'
              required
              ref={loginPasswordRef}
              onChange={(e) => setText(e.target.value)}
            />

          </div>
          <button>Continue</button>
          <p className='loginsignup-login'>Already have an account? <span>Login here</span></p>
          <div className='loginsignup-agree'>
            <input type="checkbox" name='' id='' />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        </div>
      </div>
    </form>
  )
}

export default LoginSignup