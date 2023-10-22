import axios from "axios";
import React from "react";
import { useState } from "react";
import logincss from "./login.module.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginSliceActions } from "../../store/AuthenticationSlice";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login.loggedIn);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const loginDataHandler = async (event) => {
    event.preventDefault();
    const myobj = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        myobj
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isPremium", response.data.premium);
      localStorage.setItem("isLogged", true);
      dispatch(loginSliceActions.Login());
      console.log(response)
      toast.success(response.data.message);
      navigate("/");
    } catch (err) {
      console.log(err)
       toast.error(err.response.data.message);
    }
  };
  return (
    <div className={logincss.loginMain}>
      <div className={logincss.container}>
        <div className={logincss.circle}>
          <div></div>
        </div>
        <div className={logincss.title}>
          <div className={logincss.titleText}>
            <b>Welcome back</b>
            <h4> user to</h4>
            <p>{"funds tracker"}</p>
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
            <div>
              {" "}
              <RiLockPasswordFill
                className={logincss.icon}
              ></RiLockPasswordFill>
              <input
                placeholder="enter your password "
                onChange={passwordHandler}
              ></input>
            </div>
          </div>
        </form>
        <div
          className={logincss.forgotPass}
          onClick={() => {
            navigate("/forgotPassword");
          }}
        >
          forgot password ?
        </div>
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
