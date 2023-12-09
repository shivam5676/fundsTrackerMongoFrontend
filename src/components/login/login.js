import axios from "axios";
import React from "react";
import { useState } from "react";
import logincss from "./login.module.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginSliceActions } from "../../store/AuthenticationSlice";
import { toast } from "react-toastify";
import { Dna } from "react-loader-spinner";

const Login = () => {
  const domain = "http://20.197.42.90:8000";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginLoader, setLoginLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const loginDataHandler = async (event) => {
    setLoginLoader(true);
    event.preventDefault();
    const myobj = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${domain}/user/login`, myobj);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isPremium", response.data.premium);
      localStorage.setItem("isLogged", true);
      dispatch(loginSliceActions.Login());

      navigate("/");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("something went wrong.....try after sometime ");
      }

      setLoginLoader(false);
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
          <button onClick={loginDataHandler}>
            {loginLoader ? (
              <Dna
                visible={true}
                height="40"
                width="100"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            ) : (
              "LOGIN"
            )}
          </button>
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
