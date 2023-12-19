import useDomain from "../customhook/useDomain";
import PreviousExpenseFile from "./previousGeneratedExpense";
import axios from "axios";
import downloadcss from "./downloadExpense.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRef } from "react";
import { FaCalendar, FaCalendarDay } from "react-icons/fa";
const DownloadExpense = (props) => {
  const toDateRef = useRef("");
  const fromDateRef = useRef("");
  const categoryRef = useRef("");
  const domain = useDomain();
  const downloadExpenseHandler = () => {
    const toDateValue = toDateRef.current.value;
    const fromDateValue = fromDateRef.current.value;
    axios
      .get(
        `${domain}/premiumUser/downloadexpense?toDate=${toDateValue}&fromDate=${fromDateValue}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res.data.file); //we have to create a seperate download btn for premium user for downloading this file

        const fileUrl = res.data.file;
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "fundsTracker-Expense Report";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const closeDownloadPage = () => {
    props.onCloseDownloadPage();
  };
  return (
    <div className={downloadcss.model}>
      <div className={downloadcss.container}>
        <div className={downloadcss.close}>
          <AiFillCloseCircle
            className={downloadcss.closeicon}
            onClick={closeDownloadPage}
          ></AiFillCloseCircle>
        </div>
        <div className={downloadcss.downloadPage}>
          <div className={downloadcss.dateContainer}>
            <div className={downloadcss.toDate}>
              <div className={downloadcss.inputName}>To</div>
              <input type="date" ref={toDateRef}></input>
            </div>
            <div className={downloadcss.fromDate}>
              <div className={downloadcss.inputName}>From</div>
              <input type="date" ref={fromDateRef}></input>
            </div>
          </div>
          <div
            className={downloadcss.generateReport}
            onClick={downloadExpenseHandler}
          >
            DownloadReport
          </div>
        </div>
        <div className={downloadcss.previousReport}>
          previous Download Report
        </div>
        <div className={downloadcss.previousReportContainer}>
          <PreviousExpenseFile></PreviousExpenseFile>
        </div>
      </div>
    </div>

    // <div >
    //  <button onClick={downloadExpenseHandler}>download expense</button>
    //  <div>
    //
    //  </div>
    // </div>
  );
};
export default DownloadExpense;
