import axios from "axios";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../../store/dataSlice";

const DeleteExpense = (props) => {
  const domain="http://20.197.42.90:8000"
  const dispatch = useDispatch();
  const deleteItemHandler = async (id) => {
    try {
      const response = await axios.post(
        `${domain}/user/deleteexpense`,
        { id: id },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      dispatch(dataSliceActions.deleteExpense(id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      onClick={() => {
        deleteItemHandler(props.deleteId);
      }}
      style={{
        backgroundColor: "transparent",
        color: "skyblue",
        border: "none",
      }}
    >
      <RiDeleteBin6Line
        style={{ height: "20px", width: "20px" }}
      ></RiDeleteBin6Line>
    </button>
  );
};
export default DeleteExpense;
