import { useState } from "react";

const useDomain = () => {

  const [domain] = useState("https://fundstarckerbackend.onrender.com");
 

  return domain;
};
export default useDomain;






