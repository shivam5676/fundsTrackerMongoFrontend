import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import React from "react";
import { Fragment, useState } from "react";

import Login from "./components/login/login";

import SignUp from "./components/signup/signup";
import Home from "./home/Home";

function App() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") == "true" ? true : false
  );
  console.log(isLogged);
  return (
    <Fragment>
      <Routes>
        
        {/* {isLogged&&</Route>} */}
        {!isLogged && <Route path="/login" element={<Login />} />}
        {!isLogged && <Route path="/signup" element={<SignUp />} />}
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
