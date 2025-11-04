import React from "react";
import { CardActionArea, CardContent, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";

export default function ProductsSoldChartCard({ dataset, layout, valueFormatter }: any) {
  return (
    <CardActionArea sx={{ flexGrow: 1 }}>
      <CardContent sx={{ flexGrow: 1, overflow: "auto" }}>
        <Box sx={{ minHeight: 350, width: "100%" }}>
          {layout === "horizontal" ? (
            <BarChart
              dataset={dataset}
              yAxis={[{ scaleType: "band", dataKey: "product" }]}
              series={[{ dataKey: "sold", label: "Products Sold", valueFormatter }]}
              layout="horizontal"
              sx={{ width: "100%", height: "100%" }}
            />
          ) : (
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "product" }]}
              series={[{ dataKey: "sold", label: "Products Sold", valueFormatter }]}
              layout="vertical"
              sx={{ width: "100%", height: "100%" }}
            />
          )}
        </Box>
      </CardContent>
    </CardActionArea>
  );
}
