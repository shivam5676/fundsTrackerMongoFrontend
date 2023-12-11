import { Route, Routes } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";

import Login from "./components/login/login";

import SignUp from "./components/signup/signup";
import Home from "./home/Home";
import { useDispatch, useSelector } from "react-redux";
import { loginSliceActions } from "./store/AuthenticationSlice";
import ForgotPassword from "./components/password/forgotPassword";
import UpdatePassword from "./components/password/updatePassword";

function App() {
  const dispatch = useDispatch();
 

  const isLogged = useSelector((state) => {
    return state.login.loggedIn;
  });

  useEffect(() => {
    if (localStorage.getItem("isLogged") === "true") {
      
      dispatch(loginSliceActions.Login());
    }
    if(localStorage.getItem("isPremium") === "true"){
      dispatch(loginSliceActions.premium())
    }
    
  }, [dispatch]);

 
  return (
    <Routes>
      {isLogged ? (
        <>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/forgotPassword"
            element={<ForgotPassword></ForgotPassword>}
          />
          <Route
            path="/updatePassword/:uuid"
            element={<UpdatePassword></UpdatePassword>}
          />
          <Route path="*" element={<Home />}></Route>
        </>
      ) : (
        <>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/forgotPassword"
            element={<ForgotPassword></ForgotPassword>}
          />
          <Route
            path="/updatePassword/:uuid"
            element={<UpdatePassword></UpdatePassword>}
          />
          <Route path="*" element={<Login />}></Route>
        </>
      )}
    </Routes>
  );
}

export default App;
