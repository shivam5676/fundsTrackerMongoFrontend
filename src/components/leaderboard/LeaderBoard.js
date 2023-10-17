import axios from "axios";
import { useEffect, useState } from "react";
import leaderboardcss from "./leaderboard.module.css";
import { AiFillCloseCircle } from "react-icons/ai";

const LeaderBoard = (props) => {

  const [item, setItem] = useState(false);
  const closeLeaderBoardHandler = () => {
    props.onCloseLeaderBoard();
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/premiumUser/leaderboard", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data.leaderboardData);
        const sortedData = Object.values(response.data.leaderboardData).sort(
          (a, b) => b.totalExpense - a.totalExpense//i have to write an algo for sorting based on expenses
        );
        const updatedItem = sortedData.map(
          (current, index) => {
            
            return (
              <tr key={index} className={leaderboardcss.tableRow}>

                < td className={leaderboardcss.leaderPosition}>{index}</ td>
                < td className={leaderboardcss.username}>{current.user}</ td>
                < td className={leaderboardcss.expenses}>{current.totalExpense}</ td>
              </tr>
            );
          }
        );
        setItem(updatedItem);
     
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={leaderboardcss.model}>
      <div className={leaderboardcss.container}>
        <div className={leaderboardcss.close}>
          <AiFillCloseCircle
            className={leaderboardcss.closeicon}
            onClick={closeLeaderBoardHandler}
          ></AiFillCloseCircle>
        </div>
        <div className={leaderboardcss.title}>
          <h2>Leaderboard</h2>
        </div>
        <table className={leaderboardcss.table}>
          <thead className={leaderboardcss.tableHead}>
            <tr className={leaderboardcss.tableRow}> 
              <th>position</th>
              <th>name</th>
              <th>total Expenses</th>
            </tr>
          </thead>
          <tbody>
            {item}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LeaderBoard;
