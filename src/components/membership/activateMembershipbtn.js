import axios from "axios";

import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
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

  const membershipHandler = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await axios.get(`${domain}/premiumuser/activateMembership`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    console.log(data.data.key_id);
    var options = {
      key: data.data.key_id, // Enter the Key ID generated from the Dashboard
      name: "fundsTracker (By-shivam singh)",

      order_id: data.data.order.id,
      description: "Thanks for taking pro membership",
      // image: "https://manuarora.in/logo.png",
      handler: async function (response) {
        // Validate payment at server - using webhooks is a better idea.
        try {
                      console.log("posting started")
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
                      console.log(err)
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

  // const membershipHandler = () => {
  //   axios
  //     .get(`${domain}/premiumuser/activateMembership`, {
  //       headers: { Authorization: localStorage.getItem("token") },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       let options = {
  //         key_id: response.data.key_id,
  //         order_id: response.data.order.id,
  //         handler: async function (response) {
  //           try {
  //             console.log("posting started")
  //             await axios.post(
  //               `${domain}/premiumuser/updateMembership`,
  //               {
  //                 order_id: options.order_id,
  //                 payment_id: response.razorpay_payment_id,
  //               },
  //               {
  //                 headers: { Authorization: localStorage.getItem("token") },
  //               }
  //             );
  //             localStorage.setItem("isPremium", true); //later we have to replace this localstorage to context direct fetch method when user reload the page then it should be saved in context
  //             toast.success("payment done, u are a pro member");
  //             dispatch(loginSliceActions.premium());
  //           } catch (err) {
  //             console.log(err)
  //             // toast.error(err);
  //           }
  //         },
  //       };

  //       const rzp1 = new window.Razorpay(options);
  //       rzp1.open();

  //       rzp1.on("payment.failed", function (response) {
  //         console.log(response)
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("erorr found",err)
  //       toast.error("err");
  //     });
  // };
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
