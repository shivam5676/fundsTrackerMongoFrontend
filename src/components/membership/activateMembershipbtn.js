import axios from "axios";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginSliceActions } from "../../store/AuthenticationSlice";
import useDomain from "../customhook/useDomain";

const MembershipActivate = (props) => {
  const domain = useDomain();
  const dispatch = useDispatch();

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  //code starts from here

  const membershipHandler = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      toast("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await axios.get(`${domain}/premiumuser/activateMembership`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    var options = {
      key: data.data.key_id, // Enter the Key ID generated from the Dashboard
      name: "fundsTracker (By-shivam singh)",

      order_id: data.data.order.id,
      description: "Thanks for taking pro membership",

      handler: async function (response) {
        // Validate payment at server - using webhooks is a better idea.
        try {
          console.log("posting started");
          await axios.post(
            `${domain}/premiumuser/updateMembership`,
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
          console.log(err);
          // toast.error(err);
        }
      },
      prefill: {
        name: "shivam singh",
        email: "shivam.handler@gmail.com",
        contact: "9559923286",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
