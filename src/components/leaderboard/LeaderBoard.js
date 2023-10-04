import axios from "axios";
import { useState } from "react";

const LeaderBoard = () => {
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState(false);
  const LeaderBoardHandler = () => {
    axios
      .get("http://localhost:8000/user/leaderboard", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data.leaderboardData);
        const updatedItem = Object.values(response.data.leaderboardData).map(
          (current,index) => {
            //i have to write an algo for sorting based on expenses
            return (
              <div key={index}> 
                <p>{current.totalExpense}</p>
                <p>{current.userId}</p>
              </div>
            );
          }
        );
        setItem(updatedItem)
        setVisible(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button onClick={LeaderBoardHandler}>LeaderBoard</button>
      {visible ? item:""}
    </div>
  );
};
export default LeaderBoard;
