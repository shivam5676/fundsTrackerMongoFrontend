import { useState } from "react";

const useDomain = () => {
  const [domain] = useState("http://4.227.162.123:8000");
  //useState();

  return domain;
};
export default useDomain;






