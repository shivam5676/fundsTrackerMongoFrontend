import axios from "axios";

import react from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { loginSliceActions } from "../../store/AuthenticationSlice";

const MembershipActivate = (props) => {
  const domain="http://20.197.42.90:8000"
  const dispatch = useDispatch();
  const membershipHandler = () => {
    axios
      .get(`${domain}/premiumuser/activateMembership`, {
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
                "http://localhost:8000/premiumuser/updateMembership",
                {
                  order_id: options.order_id,
                  payment_id: response.razorpay_payment_id,
                },
                {
                  headers: { Authorization: localStorage.getItem("token") },
                }
              );
              localStorage.setItem("isPremium", true); //later we have to replace this localstorage to context direct fetch method when user reload the page then it should be saved in context
              toast.success("payment done, u are a pro member");
              dispatch(loginSliceActions.premium());
            } catch (err) {
              toast.error(err);
            }
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();

        rzp1.on("payment.failed", function (response) {
          ToastContainer.success(response.error.reason);
        });
      })
      .catch((err) => {
        console.log("eror found",err)
        toast.error(err);
      });
  };
  //we have to store ispremium value in context or redux once user successfully logged in or we can do these things by updating jwt token with new object values for ispremium true and we we will fetch all jwt username,premium id from header
  return (
    <div
      onClick={membershipHandler}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </div>
  );
};
export default MembershipActivate;
