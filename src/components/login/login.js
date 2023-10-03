import axios from "axios";



import { useState } from "react";


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
        console.log(response.data.token);
        localStorage.setItem("token",response.data.token)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
    <form>
      <div>
        <label>email</label>
        <input
          placeholder="enter your email id "
          onChange={emailHandler}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          placeholder="enter your password "
          onChange={passwordHandler}
        ></input>
      </div>
      <button onClick={loginDataHandler}>LOGIN</button>
    </form>
    <a href="/signup">signup here</a>
    </div>
  );
};
export default Login;
