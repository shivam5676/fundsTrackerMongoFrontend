import { Fragment } from "react";

import "./home.css";

import MainPage from "../components/mainPage/mainPage";

import SidePanel from "../components/navigation/sidePanel";

import { useState } from "react";
import AddExpense from "../components/Expense/addExpense";

import AllExpense from "../components/Expense/allExpense";
// import Login from "./components/login/login";
import Navigation from "../components/navigation/navigation";
import LeaderBoard from "../components/leaderboard/LeaderBoard";
import DownloadExpense from "../components/downloadExpense/downloadExpense";
// import SignUp from "./components/signup/signup";
const Home = () => {
  const [openAddExpense, setOpenAddExpense] = useState(false);
  const [openAllExpense, setOpenAllExpense] = useState(false);
  const [openLeaderBoard, setOpenLeaderBaord] = useState(false);
  const [openDownloadPage, setOpenDownloadPage] = useState(false);
  const openAddExpenseHandler = () => {
    setOpenAddExpense(true);
  };
  const closeAddExpense = () => {
    setOpenAddExpense(false);
  };

  const openAllExpenseHandler = () => {
    setOpenAllExpense(true);
  };
  const closeAllExpense = () => {
    setOpenAllExpense(false);
  };

  const openLeaderBoardHandler = () => {
    setOpenLeaderBaord(true);
  };
  const closeLeaderBoard = () => {
    setOpenLeaderBaord(false);
  };
  const openDownloadPageHandler = () => {
    setOpenDownloadPage(true);
  };
  const closeDownloadPage=()=>{
    setOpenDownloadPage(false);
  }
  return (
    <Fragment>
      {" "}
      {openAddExpense ? (
        <AddExpense onCloseAddExpense={closeAddExpense}></AddExpense>
      ) : (
        ""
      )}
      {openAllExpense ? (
        <AllExpense onCloseAllExpense={closeAllExpense}></AllExpense>
      ) : (
        ""
      )}
      {openLeaderBoard ? (
        <LeaderBoard onCloseLeaderBoard={closeLeaderBoard}></LeaderBoard>
      ) : (
        ""
      )}
      {openDownloadPage?(<DownloadExpense onCloseDownloadPage={closeDownloadPage}></DownloadExpense>):("")}
      <div className="app">
        <Navigation></Navigation>

        <div className="hero">
          <SidePanel></SidePanel>
          <MainPage
            onAddExpenseOpen={openAddExpenseHandler}
            onSeeExpenseOpen={openAllExpenseHandler}
            onOpenLeaderBoard={openLeaderBoardHandler}
            onOpenDownloadPage={openDownloadPageHandler}
          ></MainPage>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
