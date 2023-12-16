import axios from "axios";
import { useEffect } from "react";
import useDomain from "../customhook/useDomain";

const PreviousExpenseFile = () => {
  const domain=useDomain();
  useEffect(() => {
    console.log("previous running")
    axios
      .get(`${domain}/premiumuser/previousdownloadexpense`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data.previousfiles); //we have to create a seperate download btn for premium user for downloading this file
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, []);

  return (
    <div>
      <h3>all previous files</h3>
    </div>
  );
};
export default PreviousExpenseFile;
