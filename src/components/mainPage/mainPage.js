import { useState } from "react";
import AddExpense from "../Expense/addExpense";
import SidePanel from "../navigation/sidePanel";
import maincss from "./mainPage.module.css";
import { Fragment } from "react";
import PieGraph from "../graph/homeGraph";

const MainPage = (props) => {
  const openAddExpenseHandler = () => {
    props.onAddExpenseOpen();
  };

  const openSeeExpenseHandler = () => {
    props.onSeeExpenseOpen();
  };

  const openLeaderBoardHandler=()=>{
    props.onOpenLeaderBoard()
  }

  return (
    <Fragment>
      <div className={maincss.main}>
        <div className={maincss.container}>
          <div className={maincss.parent}>
            <div className={maincss.profileCard}>
              <div className={maincss.profile}>
                <p className={maincss.profileName}>hello !! Shivam Singh</p>
                <p>premium member</p>
              </div>
              <div className={maincss.graphTotal}>
                <div className={maincss.totalExpense}>
                  <p>Total expense</p>
                  <p>60000</p>
                </div>
                <div className={maincss.graph}>
                  <PieGraph></PieGraph>
                </div>
              </div>
            </div>
          </div>

          <div className={maincss.parent}>
            <div className={maincss.singleCard} onClick={openAddExpenseHandler}>
            <div className={maincss.Addexpensebtn}>
              add expense
            </div></div>
          </div>

          <div className={maincss.parent}>
            <div className={maincss.doubleCard} onClick={openSeeExpenseHandler}>
              see expense
            </div>
            <div className={maincss.doubleCard}>buy membership</div>
          </div>
          <div className={maincss.parent}>
            <div className={maincss.doubleCard} onClick={openLeaderBoardHandler}>leaderboard</div>
            <div className={maincss.doubleCard}>download</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default MainPage;
