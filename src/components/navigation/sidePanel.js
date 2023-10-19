import { AiFillHome, AiTwotoneSetting } from "react-icons/ai";
import sidecss from "./sidePanel.module.css";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { loginSliceActions } from "../../store/AuthenticationSlice";
import { useNavigate } from "react-router-dom";
import { dataSliceActions } from "../../store/dataSlice";


const SidePanel = () => {const navigate=useNavigate()
  const dispatch=useDispatch()
  const logoutHandler=()=>{
dispatch(loginSliceActions.LogOut())
dispatch(dataSliceActions.reset())

localStorage.removeItem("isLogged")
localStorage.removeItem("token")
  }
  return (
    <div className={sidecss.sideContainer}>
      <div className={sidecss.sideColumn}>
        <AiFillHome className={sidecss.icon}></AiFillHome>
        <div className={sidecss.title}>Home</div>
      </div>
      <div className={sidecss.sideColumn}>
        <AiTwotoneSetting className={sidecss.icon}></AiTwotoneSetting>
        <div className={sidecss.title} onClick={()=>{
          navigate("/forgotPassword")}}>Setting</div>
      </div>
      <div className={sidecss.sideColumn} onClick={logoutHandler}>
        <RiLogoutBoxRFill className={sidecss.icon}></RiLogoutBoxRFill>
        <div className={sidecss.title}>LogOut</div>
      </div>
    </div>
  );
};
export default SidePanel;
