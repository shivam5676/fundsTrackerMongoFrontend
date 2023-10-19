import React, { useRef } from "react";
import addcss from "./addExpense.module.css";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { dataSliceActions } from "../../store/dataSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddExpense = (props) => {
  const amountRef = useRef("");
  const categoryRef = useRef("");
  const descriptionRef = useRef("");
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const data=useSelector(state=>state.data.allData)
  console.log(data)

  const expenseDataHandler = (event) => {
    event.preventDefault();
    const myobj = {
      amount: +amountRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
    };
    axios
      .post("http://localhost:8000/user/addexpense", myobj, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data.createdItem);
        dispatch(dataSliceActions.addExpense(response.data.createdItem))
        toast.success("expense added successfully")
        closeAddExpense()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const closeAddExpense = () => {
    props.onCloseAddExpense();
  };

  return (
    <div className={addcss.model}>
      <div className={addcss.container}>
        <div className={addcss.close}>
          <AiFillCloseCircle
            className={addcss.closeicon}
            onClick={closeAddExpense}
          ></AiFillCloseCircle>
        </div>
        <h2 className={addcss.containerTitle}>Let's Add some expenses</h2>
        <form className={addcss.form}>
          <div className={addcss.parent}>
            <label>Spend amount</label>
            <input placeholder="Enter total Amount " ref={amountRef}></input>
          </div>
          <div className={addcss.parent}>
            <label>expense description</label>
            <input placeholder="Add Description" ref={descriptionRef}></input>
          </div>
          <div className={addcss.parent}>
            <label>category</label>
            <select ref={categoryRef} size="1">
              <option>Food</option>
              <option>Clothing</option>
              <option>Travel</option>
              <option>Rent</option>
            </select>
          </div>
          <button onClick={expenseDataHandler} className={addcss.addBtn}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddExpense;
