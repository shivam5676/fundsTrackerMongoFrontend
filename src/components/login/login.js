import axios from "axios";
import React from "react";
import { useState } from "react";
import logincss from "./login.module.css";
import { RiLockPasswordFill } from "react-icons/ri";
import {  useNavigate } from "react-router-dom"
import { FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginSliceActions } from "../../store/AuthenticationSlice";

const Login = () => {
  const navigate=useNavigate()
 const dispatch= useDispatch();
 const loginState=useSelector(state=>state.login.loggedIn)
 console.log(loginState);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const loginDataHandler = (event) => {
    event.preventDefault();
    const myobj = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/user/login", myobj)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isPremium", response.data.premium);
        localStorage.setItem("isLogged",true)
        dispatch(loginSliceActions.Login())
        
      })
      .catch((err) => {
        console.log(err);
      });
      if(loginState){
      navigate("/")
        
      }
  };
  return (
    <div className={logincss.loginMain}>
      <div className={logincss.container}>
      <div className={logincss.circle}><div></div></div>
        <div className={logincss.title}>
          <div className={logincss.titleText}>
            <b>Welcome back</b>
            <h4> user to</h4>
            <p>`${"funds tracker"}`</p>
          </div>
          <div className={logincss.image}></div>
        </div>

        <form className={logincss.form}>
          <div className={logincss.labInput}>
           <p>Email</p>
            <div>
            <FaEnvelope className={logincss.icon}></FaEnvelope>
              <input
                placeholder="enter your email id "
                onChange={emailHandler}
              ></input>
            </div>
          </div>
          <div className={logincss.labInput}>
            <p>Password</p>
            <div> <RiLockPasswordFill className={logincss.icon}></RiLockPasswordFill>
              <input
                placeholder="enter your password "
                onChange={passwordHandler}
              ></input>
            </div>
          </div>
        </form>
        <div className={logincss.forgotPass}>forgot password ?</div>
        <div className={logincss.button}>
          <button onClick={loginDataHandler}>LOGIN</button>
        </div>
        <div className={logincss.signupbtn}>
          <p>Don`t have an Account</p>
          <a href="/signup">signup here</a>
        </div>
      </div>
    </div>
  );
};
export default Login;
