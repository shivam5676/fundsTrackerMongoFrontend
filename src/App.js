import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddExpense from "./components/Expense/addExpense"
import AllExpense from "./components/Expense/allExpense";
import LeaderBoard from "./components/leaderboard/LeaderBoard";

import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import MainPage from "./components/mainPage/mainPage";
import ForgotPassword from "./components/password/forgotPassword";
import UpdatePassword from "./components/password/updatePassword";

function App() {
  return (
    // <MainPage></MainPage>
      // <Routes>
      //   <Route path="/login" element={<Login></Login>}></Route>
      //   <Route path="/signup" element={<SignUp></SignUp>}></Route>
      // </Routes>
     <div>
      <Login></Login>
      <AddExpense></AddExpense>
      <AllExpense></AllExpense>
      <LeaderBoard></LeaderBoard>
      {/* <ForgotPassword></ForgotPassword>
      <UpdatePassword></UpdatePassword> */}
     </div>
    
  )
}

export default App;
