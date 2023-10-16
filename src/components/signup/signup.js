import axios from "axios";

import React, { useState } from "react";
import signupcss from "./signup.module.css";
import { FaEnvelope } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";
const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passIsValid, setPassIsValid] = useState(false);

  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
    if (
      event.target.value !== password &&
      event.target.value.length >= password.length
    ) {
      setPassIsValid(true);
    }
  };

  const submitDataHandler = (event) => {
    event.preventDefault();
    const myobj = {
      name: name,
      password: password,
      email: email,
    };
    axios
      .post("http://localhost:8000/user/signup", myobj)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={signupcss.signupMain}>
      <div className={signupcss.container}>
        <div className={signupcss.circle}><div>+</div></div>
        <div className={signupcss.title}>
          <div className={signupcss.titleText}>
            <h3>hello, user !!</h3>
            <h4>welcome to </h4>
            <p>"Funds tracker"</p>
          </div>
          <div className={signupcss.image}></div>
        </div>
        <form classname={signupcss.form}>
          <div className={signupcss.inputTab}>
            <p>Full Name</p>
            <div>
              <ImUserTie className={signupcss.icon}></ImUserTie>{" "}
              <input
                placeholder="enter your Full Name "
                onChange={nameHandler}
              ></input>
            </div>
          </div>

          <div className={signupcss.inputTab}>
            <p>Email id</p>
            <div>
              <FaEnvelope className={signupcss.icon}></FaEnvelope>
              <input
                placeholder="enter your email id "
                onChange={emailHandler}
              ></input>
            </div>
          </div>
          <div className={signupcss.inputTab}>
            <p>Password</p>
            <div>
              <RiLockPasswordFill
                className={signupcss.icon}
              ></RiLockPasswordFill>
              <input
                placeholder="enter your password "
                onChange={passwordHandler}
              ></input>
            </div>
          </div>
          <div className={signupcss.inputTab}>
            <p>Confirm Password</p>
            <div>
              <RiLockPasswordLine
                className={signupcss.icon}
              ></RiLockPasswordLine>
              <input
                placeholder="Re-type your password "
                onChange={confirmPasswordHandler}
              ></input>
            </div>
          </div>
          {/* {!passIsValid && password.length>=6 ? <h1>password and confirm password not matched</h1>:""} */}
        </form>
        <div className={signupcss.signupbtn}>
          <button onClick={submitDataHandler}>SIGN UP</button>
        </div>
        <div className={signupcss.loginbtn}>
          <p>Already have an account</p>
          <a href="/login">
            <button>Login now</button>
          </a>
        </div>
      </div>
    </div>
  );
};
export default SignUp;