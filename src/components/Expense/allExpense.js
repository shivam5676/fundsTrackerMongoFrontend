import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import MembershipActivate from "../membership/activateMembershipbtn";
import DeleteExpense from "../Expense/deleteExpense";

const AllExpense = () => {
  const userDate = new Date();
  const [filterDate, setFilterDate] = useState("Default");
  const [allData, setAllData] = useState([]);

  const userDateHandler = (event) => {
    console.log(event.target.value);
    const selectedTime = event.target.value;
  
    if (selectedTime == "Today") {
      setFilterDate(
        userDate.toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
    } else if (selectedTime == "This month") {
      setFilterDate(
        userDate.toLocaleString("en-GB", { year: "numeric", month: "2-digit" })
      );
    } else if (selectedTime == "This year") {
      setFilterDate(userDate.toLocaleString("en-GB", { year: "numeric" }));
    }
    else{
      setFilterDate("Default")
    }
  };
console.log(filterDate)
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/getexpense", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data);
        const dataArray = response.data.map((currentIndex) => {
          const currentIndexDate = new Date(currentIndex.updatedAt).toLocaleString();
          console.log(currentIndexDate)
          if(currentIndexDate.includes(filterDate) || filterDate==="Default"){
            return (
            <div key={currentIndex.id}>
              <h3>{currentIndex.amount}</h3>
              <h2>{currentIndex.description}</h2>
              <h3>{currentIndex.category}</h3>
              <h4>{currentIndexDate}</h4>
              <DeleteExpense deleteId={currentIndex.id}></DeleteExpense>
            </div>
          );
          }
          
        });
        setAllData(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filterDate]);
  return (
    <div>
      {" "}
      fetched expenses
      <MembershipActivate></MembershipActivate>
      <div>
        <select onChange={userDateHandler}>
          <option>Today</option>
          <option>This month</option>
          <option>This year</option>
          <option>All Time</option>
        </select>

        <h3>{allData}</h3>
      </div>
    </div>
  );
};
export default AllExpense;
