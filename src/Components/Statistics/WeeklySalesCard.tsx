import React from "react";
import { Box, Typography, CardContent, CircularProgress } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";

export default function WeeklySalesCard({ loadingWeeklyData, weeklySalesData, dayLabels, totalWeeklySales, weeklyData }: any) {
  return (
    <CardContent sx={{ flexGrow: 1 }}>
      {loadingWeeklyData ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : weeklySalesData && weeklySalesData.length > 0 ? (
        <>
          <SparkLineChart data={weeklySalesData} height={150} area showTooltip showHighlight />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            {dayLabels.map((day: string) => (
              <Typography key={day} variant="caption" align="center">
                {day}
              </Typography>
            ))}
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Total Sales: <strong>{totalWeeklySales}</strong> units
          </Typography>
          <Typography variant="caption" display="block" align="center" color="text.secondary">
            {weeklyData.length} sales transactions
          </Typography>
        </>
      ) : (
        <Typography variant="body2" align="center" color="text.secondary" sx={{ py: 4 }}>
          No sales data available for previous week
        </Typography>
      )}
    </CardContent>
  );
}
