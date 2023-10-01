import axios from "axios";

const { useState } = require("react");

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
    <div>
      <form>
        <div>
          <label>Your Name</label>
          <input
            placeholder="enter your Full Name "
            onChange={nameHandler}
          ></input>
        </div>
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
        <div>
          <label>confirm Password</label>
          <input
            placeholder="enter your confirm password "
            onChange={confirmPasswordHandler}
          ></input>
        </div>
        {/* {!passIsValid && password.length>=6 ? <h1>password and confirm password not matched</h1>:""} */}
        <button onClick={submitDataHandler}>signup</button>
      </form>
    </div>
  );
};
export default SignUp;
