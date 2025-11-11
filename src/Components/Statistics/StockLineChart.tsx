import React from "react";
import { LineChart } from "@mui/x-charts";
import { Box } from "@mui/material";

interface StockLineChartProps {
  chartData: { date: Date; quantity: number }[];
}

const StockLineChart: React.FC<StockLineChartProps> = ({ chartData }) => {
  return (
    <Box
      sx={{
        width: 600,
        height: 400,
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "10px",
      }}
    >
      <LineChart
        xAxis={[
          {
            data: chartData.map((d) => d.date),
            scaleType: "time",
            label: "Date",
            valueFormatter: (value) =>
              new Date(value).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              }),
          },
        ]}
        series={[
          {
            data: chartData.map((d) => d.quantity),
            label: "Stock Change",
            showMark: true,
            color: "#1976d2",
          },
        ]}
        yAxis={[{ label: "Quantity Change" }]}
        grid={{ vertical: true, horizontal: true }}
      />
    </Box>
  );
};

export default StockLineChart;