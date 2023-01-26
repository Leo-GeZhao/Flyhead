import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ food, hotel, attraction }) => {
  return (
    <div>
      <Chart
        type="pie"
        height={400}
        width={400}
        series={[food, hotel, attraction]}
        options={{
          labels: ["Food", "Hotel", "Attraction"],
          colors: ["#95bb72", "#da8ee7", "#6699CC"],
        }}
      ></Chart>
    </div>
  );
};

export default PieChart;
