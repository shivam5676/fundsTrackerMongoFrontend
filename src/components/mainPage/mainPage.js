import maincss from "./mainPage.module.css";

import PieGraph from "../graph/homeGraph";
import {  useSelector } from "react-redux";


const MainPage = (props) => {
 
  const graphTotal=useSelector(state=>state.graph.total)
console.log(graphTotal)

  const openAddExpenseHandler = () => {
    props.onAddExpenseOpen();
  };

  const openSeeExpenseHandler = () => {
    props.onSeeExpenseOpen();
  };

  const openLeaderBoardHandler = () => {
    props.onOpenLeaderBoard();
  };
  
  return (
   
      <div className={maincss.main}>
        <div className={maincss.container}>
          <div className={maincss.parent}>
            <div className={maincss.profileCard}>
              <div className={maincss.profile}>
                <p className={maincss.profileName}>hello !! Shivam</p>
                <p>premium member</p>
              </div>
              <div className={maincss.graphTotal}>
                <div className={maincss.totalExpense}>
                  <p>Total expense</p>
                  <p>{graphTotal}</p>
                </div>
                <div className={maincss.graph}>
                  <PieGraph ></PieGraph>
                </div>
              </div>
            </div>
          </div>

          <div className={maincss.parent}>
            <div className={maincss.singleCard} onClick={openAddExpenseHandler}>
              <div className={maincss.Addexpensebtn}>Add expense</div>
            </div>
          </div>

          <div className={maincss.parent}>
            <div className={maincss.doubleCard} onClick={openSeeExpenseHandler}>
              My Expenses
            </div>
            <div className={maincss.doubleCard}>Buy MemberShip</div>
          </div>
          <div className={maincss.parent}>
            <div
              className={maincss.doubleCard}
              onClick={openLeaderBoardHandler}
            >
              LeaderBoard
            </div>
            <div className={maincss.doubleCard}>Download</div>
          </div>
        </div>
      </div>
   
  );
};
export default MainPage;
