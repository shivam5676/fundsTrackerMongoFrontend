import axios from "axios";

import React, { useState } from "react";

const MembershipActivate = (props) => {
  const [isPremium,setIsPremium]=useState(localStorage.getItem("isPremium"))
  const membershipHandler = () => {
    axios
      .get("http://localhost:8000/user/activateMembership", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);
        let options = {
          key_id: response.data.key_id,
          order_id: response.data.order.id,
          handler: async function (response) {
            try {
              await axios.post(
                "http://localhost:8000/user/updateMembership",
                {
                  order_id: options.order_id,
                  payment_id: response.razorpay_payment_id,
                },
                {
                  headers: { Authorization: localStorage.getItem("token") },
                }
              );
              localStorage.setItem("isPremium", true); //later we have to replace this localstorage to context direct fetch method when user reload the page then it should be saved in context
              alert("payment done, u are a pro member");
              setIsPremium("true")
            } catch (err) {
              console.log(err);
            }
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();

        rzp1.on("payment.failed", function (response) {
          console.log(response);

          alert(response.error.reason);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
//we have to store ispremium value in context or redux once user successfully logged in or we can do these things by updating jwt token with new object values for ispremium true and we we will fetch all jwt username,premium id from header
  return (
    <div>
      {isPremium!=="true" ?<button onClick={membershipHandler}> Activate memberShip</button>:<p>user is a pro member</p>}
      
    </div>
  );
};
export default MembershipActivate;
