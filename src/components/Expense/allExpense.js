import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import MembershipActivate from "../membership/activateMembershipbtn";
import DeleteExpense from "../Expense/deleteExpense";
import { redirect } from "react-router-dom";

const AllExpense = () => {
  const userDate = new Date();
  const [filterDate, setFilterDate] = useState("Default");
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [itemPerPage, setItemPerPage] = useState(10);

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
    } else {
      setFilterDate("Default");
    }
  };
  console.log(filterDate);
  useEffect(() => {
    const items = localStorage.getItem("item");
    axios
      .get(
        `http://localhost:8000/user/getexpense?pageNo=${currentPage}&&item=${items}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((response) => {
        console.log(response.data);
        setNextPage(response.data.nextPage);
        setPrevPage(response.data.previousPage);
        const dataArray = response.data.result.map((currentIndex) => {
          const currentIndexDate = new Date(
            currentIndex.updatedAt
          ).toLocaleString();
          console.log(currentIndexDate);
          if (
            currentIndexDate.includes(filterDate) ||
            filterDate === "Default"
          ) {
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
  }, [filterDate, currentPage, itemPerPage]);

  const pageNoHandler = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const dynamicPageHandler = (event) => {
    setItemPerPage(event.target.value);
    localStorage.setItem("item", +event.target.value);
  };
  const defaultVAlue = localStorage.getItem("item");

  return (
    <div>
      {" "}
      fetched expenses
      <MembershipActivate></MembershipActivate>
      <div>
        <select onChange={userDateHandler}>
          <option>All Time</option>
          <option>Today</option>
          <option>This month</option>
          <option>This year</option>
        </select>
        <div>
          <h4>select item per page</h4>
          <select onChange={dynamicPageHandler}>
            {defaultVAlue == 10 ? (
              <option selected>10</option>
            ) : (
              <option>10</option>
            )}
            {defaultVAlue == 25 ? (
              <option selected>25</option>
            ) : (
              <option>25</option>
            )}
            {defaultVAlue == 50 ? (
              <option selected>50</option>
            ) : (
              <option>50</option>
            )}
            {defaultVAlue == 100 ? (
              <option selected>100</option>
            ) : (
              <option>100</option>
            )}
          </select>
        </div>

        <h3>{allData}</h3>
        <div>
          {prevPage === true ? (
            <button
              onClick={() => {
                pageNoHandler(currentPage - 1);
              }}
            >
              {currentPage - 1}
            </button>
          ) : (
            ""
          )}

          <button
            onClick={() => {
              pageNoHandler(currentPage);
            }}
          >
            {currentPage}
          </button>
          {nextPage === true ? (
            <button
              onClick={() => {
                pageNoHandler(currentPage + 1);
              }}
            >
              {currentPage + 1}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default AllExpense;
