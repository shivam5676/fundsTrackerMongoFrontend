import axios from "axios";
import { useEffect } from "react";

const PreviousExpenseFile = () => {
  const domain="http://20.197.42.90:8000"
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
