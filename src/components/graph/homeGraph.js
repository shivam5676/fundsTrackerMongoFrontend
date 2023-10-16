

import React from "react";
import { Chart } from "react-google-charts";
const PieGraph = () => {
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7], // CSS-style declaration
  ];

  const options = {
   
    pieHole: 0.7,
    is3D: false,
    backgroundColor:"transparent",
    pieSliceText: "none",
    legend: {
        position: "none", // Set the legend position to "right"
      },
  };
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
export default PieGraph
