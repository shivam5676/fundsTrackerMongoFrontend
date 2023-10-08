import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri"
import upcss from "./updatePassword.module.css"
import { GiCrossMark } from "react-icons/gi"
import { useRef } from "react";
import axios from "axios";
const UpdatePassword=()=>{
    const passwordRef=useRef("");
    const updatePasswordHandler=()=>{
axios.post("http://localhost:8000/user/password/resetpassword/96c81373-6d2b-452f-a65d-6ce77e457e39")
    }

    return(
        <div className={upcss.main}>
      <div className={upcss.container}>
        <div className={upcss.title}>
          <h3>forgot password</h3>
        </div>
        <div className={upcss.close}>
          <button>
            <GiCrossMark className={upcss.icon}></GiCrossMark>
          </button>
        </div>
        <div className={upcss.form}>
            <RiLockPasswordFill className={upcss.envicon}></RiLockPasswordFill>
          
          <div className={upcss.inputlabel}>
            <div>password</div>

            <input
              placeholder="Enter New Password"
              ref={passwordRef}
            ></input>
          </div>

          <RiLockPasswordLine className={upcss.envicon}></RiLockPasswordLine>
          
          <div className={upcss.inputlabel}>
            <div>Confirm Password</div>

            <input
              placeholder="Re-type password"
              ref={passwordRef}
            ></input>
          </div>
        </div>
        
        <div className={upcss.recoverybtn}>
          <button onClick={updatePasswordHandler}>Send Password</button>
        </div>
      </div>
    </div>
    )
}
export default UpdatePassword