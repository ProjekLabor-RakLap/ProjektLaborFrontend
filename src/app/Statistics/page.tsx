import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

interface DataPoint {
  x: number;
  v6: number;
  v7: number;
  v8: number;
}

const sampleData: DataPoint[] = [
  { x: new Date("2023-07-01").getTime(), v6: 5000, v7: 0, v8: 0 },
  { x: new Date("2023-10-01").getTime(), v6: 15000, v7: 0, v8: 0 },
  { x: new Date("2024-04-01").getTime(), v6: 60000, v7: 20000, v8: 0 },
  { x: new Date("2024-10-01").getTime(), v6: 90000, v7: 200000, v8: 0 },
  { x: new Date("2025-04-01").getTime(), v6: 120000, v7: 350000, v8: 200000 },
  { x: new Date("2025-11-01").getTime(), v6: 150000, v7: 370000, v8: 420000 },
];

export default function WarehouseCostChart() {
  const xValues = sampleData.map((d) => d.x);

  return (
    <Card
      sx={{
        bgcolor: "#0b0d10",
        color: "white",
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Warehouse Stock Performance
        </Typography>

        <Box sx={{ width: "100%", height: 400 }}>
          <LineChart
            xAxis={[
              {
                data: xValues,
                scaleType: "time",
                valueFormatter: (value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  }),
              },
            ]}
            yAxis={[{ label: "Stock Value" }]}
            series={[
              {
                data: sampleData.map((d) => d.v6),
                label: "v6",
                color: "#2196F3",
                area: true,
                showMark: false,
                curve: "linear",
                areaStyle: { fill: "url(#v6Gradient)" },
              },
              {
                data: sampleData.map((d) => d.v7),
                label: "v7",
                color: "#FBC02D",
                area: true,
                showMark: false,
                curve: "linear",
                areaStyle: { fill: "url(#v7Gradient)" },
              },
              {
                data: sampleData.map((d) => d.v8),
                label: "v8",
                color: "#E53935",
                area: true,
                showMark: false,
                curve: "linear",
                areaStyle: { fill: "url(#v8Gradient)" },
              },
            ]}
            widths="100%"
            height={400}
            margin={{ top: 30, right: 40, bottom: 40, left: 60 }}
            grid={{ vertical: false, horizontal: true }}
            slotProps={{
              legend: {
                direction: "row" as any,
                position: { vertical: "top", horizontal: "center" },
              },
            }}
          >
            <defs>
              <linearGradient id="v6Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2196F3" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2196F3" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="v7Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBC02D" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FBC02D" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="v8Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E53935" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#E53935" stopOpacity="0" />
              </linearGradient>
            </defs>
          </LineChart>
        </Box>
      </CardContent>
    </Card>
  );
}
