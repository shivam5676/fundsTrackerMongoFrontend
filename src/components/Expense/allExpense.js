import { useEffect, useState } from "react";
import axios from "axios";
import DeleteExpense from "./deleteExpense";

const AllExpense = () => {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/getexpense")
      .then((response) => {
        console.log(response.data);
       const dataArray= response.data.map((current)=>{
        return <div key={current.id}><h3>{current.amount}</h3><h2>{current.description}</h2><h3>{current.category}</h3>
        <DeleteExpense deleteId={current.id}></DeleteExpense></div>
       })
        setAllData(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  return (
    <div>
      {" "}
      fetched expenses
      <h3>{allData}</h3>
    </div>
  );
};
export default AllExpense;
