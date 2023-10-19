import maincss from "./mainPage.module.css";

import PieGraph from "../graph/homeGraph";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { dataSliceActions } from "../../store/dataSlice";
import MembershipActivate from "../membership/activateMembershipbtn";

const MainPage = (props) => {
  const dispatch = useDispatch();
  const premiumState = useSelector((state) => state.login.isPremium);

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
      .catch((err) => {});
  }, []);
  const [total, setTotal] = useState(0);

  const graphTotalHandler = (amount) => {
    setTotal(amount);
  };
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
             { premiumState?<p className={maincss.prouser}>premium user</p>:<p className={maincss.normaluser}>normal user</p>}
            </div>
            <div className={maincss.graphTotal}>
              <div className={maincss.totalExpense}>
                <p>Total expense</p>
                <p>{total}</p>
              </div>
              <div className={maincss.graph}>
                <PieGraph graphTotal={graphTotalHandler}></PieGraph>
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

          {!premiumState && (
            <div className={maincss.doubleCard}>
              <MembershipActivate>BUY MemberShip</MembershipActivate>
            </div>
          )}
        </div>
        <div className={maincss.parent}>
          {premiumState && (
            <div
              className={maincss.doubleCard}
              onClick={openLeaderBoardHandler}
            >
              LeaderBoard
            </div>
          )}
          <div className={maincss.doubleCard}>Download</div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
