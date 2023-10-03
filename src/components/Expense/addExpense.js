
import React, { useRef } from "react";
=======
import { useRef } from "react";

import axios from "axios"
const AddExpense = () => {
  const amountRef = useRef("");
  const categoryRef = useRef("");
  const descriptionRef = useRef("");

  const expenseDataHandler = (event) => {
    event.preventDefault();
    const myobj = {
      amount: amountRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
    };
    axios
      .post("http://localhost:8000/user/addexpense",myobj,{headers:{"Authorization":localStorage.getItem("token")}} )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div>
        addexpense
      <form > 
        <div>
          <label>Spend amount</label>
          <input placeholder="Enter total Amount " ref={amountRef}></input>
        </div>
        <div>
          <label>expense description</label>
          <input placeholder="Add Description" ref={descriptionRef}></input>
        </div>
        <div>
          <label>category</label>
          <select ref={categoryRef}>
            <option>Food</option>
            <option>Clothing</option>
            <option>Travel</option>
            <option>Rent</option>
          </select>
        </div>
        <button onClick={expenseDataHandler}>Add Expense</button>
      </form>
    </div>
  );
};
export default AddExpense
