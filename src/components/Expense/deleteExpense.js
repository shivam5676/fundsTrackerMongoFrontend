import axios from "axios";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteExpense = (props) => {
  const deleteItemHandler = (id) => {
    console.log(id);
    axios
      .post(
        "http://localhost:8000/user/deleteexpense",
        { id: id },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
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
