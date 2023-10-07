import fpcss from "./forgotPassword.module.css";
import { FaEnvelope } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import axios from "axios";
import { useRef } from "react";
const ForgotPassword = () => {
  const emailref = useRef("");
  const forgotPasswordHandler = () => {
    const emailValue = emailref.current.value;
    axios
      .post("http://localhost:8000/user//password/forgot", emailValue)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={fpcss.main}>
      <div className={fpcss.container}>
        <div className={fpcss.title}>
          <h3>forgot password</h3>
        </div>
        <div className={fpcss.close}>
          <button>
            <GiCrossMark className={fpcss.icon}></GiCrossMark>
          </button>
        </div>
        <div className={fpcss.form}>
          <FaEnvelope className={fpcss.envicon}></FaEnvelope>
          <div className={fpcss.inputlabel}>
            <div>email</div>

            <input
              placeholder="enter registered email id"
              ref={emailref}
            ></input>
          </div>
        </div>
        <div className={fpcss.recoverybtn}>
          <button onClick={forgotPasswordHandler}>Send Password</button>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
