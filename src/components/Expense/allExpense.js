import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import MembershipActivate from "../membership/activateMembershipbtn";
import DeleteExpense from "../Expense/deleteExpense";
import { redirect } from "react-router-dom";
import allcss from "./allExpense.module.css";
import { AiFillCloseCircle } from "react-icons/ai";

const AllExpense = (props) => {
  const userDate = new Date();
  const [filterDate, setFilterDate] = useState("Default");
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [optionChange, setOptionChange] = useState("All Time");

  const userDateHandler = (data) => {
    setOptionChange(data);

    const selectedTime = data;

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
          ).toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          console.log(currentIndexDate);
          if (
            currentIndexDate.includes(filterDate) ||
            filterDate === "Default"
          ) {
            return (
              <tr key={currentIndex.id} className={allcss.tablerow}>
                <td className={allcss.tablerowDate}>{currentIndexDate}</td>
                <td className={allcss.tablerowAmount}>{currentIndex.amount}</td>
                <td className={allcss.tablerowCategory}>{currentIndex.category}</td>
                <td className={allcss.tablerowDescription}> {currentIndex.description}</td>
                <td>
                  <DeleteExpense deleteId={currentIndex.id}></DeleteExpense>
                </td>
              </tr>
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

  const closeAllExpense = () => {
    props.onCloseAllExpense();
  };
  return (
    <div className={allcss.model}>
      <div className={allcss.container}>
        <div className={allcss.close}>
          <AiFillCloseCircle
            className={allcss.closeicon}
            onClick={closeAllExpense}
          ></AiFillCloseCircle>
        </div>
        <div className={allcss.pageSelector}>
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
        <div className={allcss.slidingContainer}>
          <div
            className={`${allcss.option} ${
              optionChange === "All Time" ? allcss.active : ""
            }`}
            onClick={() => userDateHandler("All Time")}
          >
            All Time
          </div>
          <div
            className={`${allcss.option} ${
              optionChange === "Today" ? allcss.active : ""
            }`}
            onClick={() => userDateHandler("Today")}
          >
            Today
          </div>
          <div
            className={`${allcss.option} ${
              optionChange === "This month" ? allcss.active : ""
            }`}
            onClick={() => userDateHandler("This month")}
          >
            This month
          </div>
          <div
            className={`${allcss.option} ${
              optionChange === "This year" ? allcss.active : ""
            }`}
            onClick={() => userDateHandler("This year")}
          >
            This year
          </div>
        </div>

        <table className={allcss.table}>
          <thead className={allcss.tableHead}>
            <tr className={allcss.tablerow}>
              <th className={allcss.tablerowDate}>Date</th>
              <th className={allcss.tablerowAmount}>amount</th>
              <th className={allcss.tablerowCategory}>category</th>
              <th className={allcss.tablerowDescription}>description</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={allcss.tableBody}>{allData}</tbody>
        </table>

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