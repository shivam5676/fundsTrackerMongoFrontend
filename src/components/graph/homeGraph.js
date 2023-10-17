
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";

import { graphDataSliceActions } from "../../store/graphDataSlice";
import { useEffect } from "react";
const PieGraph = (props) => {
  const dispatch=useDispatch()
  const graphState = useSelector((state) => state.data.allData);
  let resultArray = [];
  let total = 0;
  graphState.forEach((current) => {
    const existingCategoryIndex = resultArray.findIndex(
      (item) => item[0] === current.category
    );
    total = total + current.amount;

    if (existingCategoryIndex !== -1) {
      // If the category already exists, add the amount to the existing total
      resultArray[existingCategoryIndex][1] += current.amount;
    } else {
      // If the category doesn't exist, create a new entry
      resultArray.push([current.category, current.amount]);
    }
  });

  console.log("data", resultArray);
  const data = [["Category", "Amount"], ...resultArray];

  const options = {
    pieHole: 0.65,
    is3D: false,
    backgroundColor: "transparent",
    pieSliceText: "none",
    legend: {
      position: "none",
    },
  };
  useEffect(()=>{
    dispatch(graphDataSliceActions.graphTotal(total))
  },[graphState])

  return (
    <Chart
      chartType="PieChart"
      width="180px"
      height="200px"
      data={data}
      options={options}
      background-color="transparent"
    />
  );
};
export default PieGraph;
