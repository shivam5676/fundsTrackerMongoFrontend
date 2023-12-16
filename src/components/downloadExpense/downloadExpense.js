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
    axios
      .get(`${domain}/premiumuser/downloadexpense}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data.file); //we have to create a seperate download btn for premium user for downloading this file
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
              <input type="date"></input>
            </div>
            <div className={downloadcss.fromDate}>
            <div className={downloadcss.inputName}>From</div>
              <input type="date"></input>
            </div>
          </div>
          <div className={downloadcss.generateReport}>DownloadReport</div>
        </div>
        <div className={downloadcss.previousReport}>previous Download Report</div>
        <div className={downloadcss.previousReportContainer}></div>
      </div>
    </div>

    // <div >
    //  <button onClick={downloadExpenseHandler}>download expense</button>
    //  <div>
    //    <PreviousExpenseFile></PreviousExpenseFile>
    //  </div>
    // </div>
  );
};
export default DownloadExpense;
