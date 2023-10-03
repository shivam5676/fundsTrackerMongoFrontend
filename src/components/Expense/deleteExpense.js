
import axios from "axios";
import React from "react";

import axios from "axios"

const DeleteExpense = (props) => {
  const deleteItemHandler = (id) => {
    console.log(id);
    axios
      .post("http://localhost:8000/user/deleteexpense",{id:id},{headers:{"Authorization":localStorage.getItem("token")}})
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
    >

      Delete 
    </button>
  );
};
export default DeleteExpense

    

