import React, { useRef, useState } from "react";
import addcss from "./addExpense.module.css";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../../store/dataSlice";
import { toast } from "react-toastify";
import useDomain from "../customhook/useDomain";
import { ThreeDots } from "react-loader-spinner";

const AddExpense = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const domain = useDomain();
  const amountRef = useRef("");
  const categoryRef = useRef("");
  const descriptionRef = useRef("");
  const dispatch = useDispatch();

  const expenseDataHandler = async (event) => {
    setIsLoader(true);
    event.preventDefault();
    const myobj = {
      amount: +amountRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
    };
    try {
      const response = await axios.post(`${domain}/user/addexpense`, myobj, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      dispatch(dataSliceActions.addExpense(response.data.createdItem[0]));
      setIsLoader(false);
      toast.success("expense added successfully");
      // closeAddExpense();
    } catch (err) {
      console.log(err)
      setIsLoader(false);
      toast.success(err);
    }
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
         {isLoader ? (
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"15px"}}><ThreeDots
                height="40"
                width="80"
                radius="9"
                // color="aliceblue"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              ></ThreeDots>Adding...</div>
              
            ) : (
               <button onClick={expenseDataHandler} className={addcss.addBtn}>
            ADD Expense
          </button>
            )}
        </form>
      </div>
    </div>
  );
};
export default AddExpense;
