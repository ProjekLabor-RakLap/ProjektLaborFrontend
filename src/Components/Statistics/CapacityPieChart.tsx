import React from "react";
import { PieChart } from "@mui/x-charts";
import { Card, CardContent, Grid, Typography } from "@mui/material";

interface CapacityPieChartProps {
  title: string;
  data: { id: number; value: number; label: string }[];
  colors: string[];
}

const CapacityPieChart: React.FC<CapacityPieChartProps> = ({ title, data, colors }) => {
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", my: 3, bgcolor: "background.paper" }}>
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <PieChart colors={colors} series={[{ data }]} width={250} height={250} />
          <Typography sx={{ color: "black", mt: 1 }}>{title}</Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CapacityPieChart;
