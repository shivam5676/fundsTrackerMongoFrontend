import axios from "axios";

import { useState } from "react";
import logincss from "./login.module.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";
import { FaEnvelope } from "react-icons/fa";

const Login = () => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={logincss.loginMain}>
      <div className={logincss.container}>
      <div className={logincss.circle}><div></div></div>
        <div className={logincss.title}>
          <div className={logincss.titleText}>
            <b>Welcome back</b>
            <h4> user to</h4>
            <p>"Funds tracker"</p>
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
