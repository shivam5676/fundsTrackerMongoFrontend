import axios from "axios";
import { useEffect, useState } from "react";
import useDomain from "../customhook/useDomain";
import PreviousExpenseDownloadButton from "./previousExpenseDownloadButton";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

const PreviousExpenseFile = () => {
  const [previousExpenseList, setPreviousExpenseList] = useState([]);
  const domain = useDomain();
  useEffect(() => {
    console.log("previous running");
    axios
      .get(`${domain}/premiumuser/previousdownloadexpense`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
         //we have to create a seperate download btn for premium user for downloading this file
        const newArray = res.data.previousfiles.map((current) => {
          const StringifiedDate = new Date(current.createdAt);
        
          const formattedDate = StringifiedDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            // timeZone: 'IST'
          });
          
          return (
            <div key={(current._id)}
              style={{
                display: "flex",
                alignItems: "center",
                background: "green",
                height: "50px",
                maxWidth:"500px",
                margin: "5px",
                justifyContent: "space-between",
              }}
              
            >
              <div
                style={{ margin: "5px", color: "white", fontWeight: "bold" }}
              >
                {formattedDate}
              </div>
              <div
                style={{ width: "40px", height: "40px",margin:"0px 10px" }}
              >
               <PreviousExpenseDownloadButton link={current.fileURL}></PreviousExpenseDownloadButton>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  width: "100px",
                  flexDirection: "column",
                  margin: "0px 10px",
                 alignItems:"center"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "12px",
                    color: "whitesmoke",
                    fontSize:".9rem"
                    // fontWeight:"bold"
                  }}
                >
                  {current.fromDate}
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "12px",
                    color: "whitesmoke",
                    marginBottom: "4px",
                    marginTop: "2px",
                    fontWeight:"bold"
                    
                  }}
                >
                  to
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "12px",
                    color: "whitesmoke",
                  //  fontWeight:"bold"
                  fontSize:".9rem"
                  }}
                >
                  {current.toDate}
                </div>
              </div>
            </div>
          );
        });

        setPreviousExpenseList(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ margin: "5px" }}>
      <div style={{background:"orange",height:"50px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"white",margin:"0px 5px"}}>
        <div style={{width:"70px",textAlign:"center"}}>requested on</div>
        <div style={{width:"70px",textAlign:"center",margin:"0px 5px"}}>download link</div>
        <div style={{width:"70px",textAlign:"center"}}>expenses date</div>
      </div>
      
      {previousExpenseList}</div>
    // <div
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     background: "red",
    //     height: "50px",
    //     width: "100%",
    //     margin: "5px",
    //     justifyContent: "space-between",
    //   }}
    // >
    //   <div style={{ margin: "5px", color: "white", fontWeight: "bold" }}>
    //     createdAt
    //   </div>
    //   <div style={{ width: "40px", background: "black", height: "40px" }}>
    //     tigers
    //   </div>
    //   <div
    //     style={{
    //       display: "flex",
    //       height: "100%",
    //       width: "100%",
    //       flexDirection: "column",
    //       margin: "0px 10px",
    //     }}
    //   >
    //     <div style={{ display: "flex", height: "12px", color: "whitesmoke" }}>
    //       to date
    //     </div>
    //     <div
    //       style={{
    //         display: "flex",
    //         height: "12px",
    //         color: "whitesmoke",
    //         marginBottom: "2px",
    //         marginTop: "2px",
    //       }}
    //     >
    //       to
    //     </div>
    //     <div style={{ display: "flex", height: "12px", color: "whitesmoke" }}>
    //       fromDate
    //     </div>
    //   </div>
    // </div>
  );
};
export default PreviousExpenseFile;
