import { Route, Routes } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";


import Login from "./components/login/login";

import SignUp from "./components/signup/signup";
import Home from "./home/Home";
import { useDispatch, useSelector } from "react-redux";
import { loginSliceActions } from "./store/AuthenticationSlice";
import axios from "axios";
import { dataSliceActions } from "./store/dataSlice";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => {
    return state.login.loggedIn;
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/getexpense`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        response.data.result.forEach((element) => {
          dispatch(dataSliceActions.addExpense(element));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLogged]);

  useEffect(() => {
    if (localStorage.getItem("isLogged") === "true") {
      dispatch(loginSliceActions.Login());
    }
  }, []);

  console.log(isLogged);
  return (
    <Routes>
      {isLogged ? (
        <>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
        </>
      ) : (
        <>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Login />}></Route>
        </>
      )}
    </Routes>
  );
}

export default App;
