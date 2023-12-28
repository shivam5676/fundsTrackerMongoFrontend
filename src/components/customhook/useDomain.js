import { useState } from "react";

const useDomain = () => {
  const [domain] = useState(process.env.CONNECTIONURL)//useState("http://4.227.162.123:8000");

  return domain;
};
export default useDomain;






