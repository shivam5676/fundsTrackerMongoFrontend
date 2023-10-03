import axios from "axios";

import React from "react";

const MembershipActivate = (props) => {
  const membershipHandler = () => {
    axios
      .get("http://localhost:8000/user/activateMembership", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);
        let options = {
          "key_id": response.data.key_id,
          "order_id": response.data.order.id,
          "handler": async function (response) {
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

            alert("payment done, u are a pro member");
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

  return <button onClick={membershipHandler}> {props.children}</button>;
};
export default MembershipActivate;
