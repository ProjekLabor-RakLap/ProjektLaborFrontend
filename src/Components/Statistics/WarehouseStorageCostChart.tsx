import React, { useMemo } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { IWarehouseStorageCost, IProductStorageCost } from "../../Interfaces/IWarehouseStorageCost";

interface WarehouseStorageCostChartProps {
  storageCostData: IWarehouseStorageCost;
}

export default function WarehouseStorageCostChart({ storageCostData }: WarehouseStorageCostChartProps) {
    console.log("storageCostData:", storageCostData);
  const chartData = useMemo(() => {
    if (!storageCostData?.storageCosts?.length) return { xValues: [], series: [] };

    const productCostMap = new Map<string, Map<number, number>>();

    storageCostData.storageCosts.forEach((productData: IProductStorageCost) => {
      const productName = productData.product?.name ?? "Unknown Product";
      const dateMap = productCostMap.get(productName) ?? new Map<number, number>();

      productData.dailyCosts.forEach((daily) => {
        const date = new Date(daily.date);
        const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        dateMap.set(day, daily.cost);
      });

      productCostMap.set(productName, dateMap);
    });

    const allDates = Array.from(
      new Set(
        Array.from(productCostMap.values()).flatMap((map) => Array.from(map.keys()))
      )
    ).sort((a, b) => a - b);

    const colors = [
      "#42a5f5",
      "#66bb6a",
      "#ffa726",
      "#ab47bc",
      "#ef5350",
      "#26c6da",
      "#ff7043",
      "#9ccc65",
    ];

    const series = Array.from(productCostMap.entries()).map(([productName, dateMap], i) => ({
      label: productName,
      data: allDates.map((day) => dateMap.get(day) || 0),
      color: colors[i % colors.length],
      area: true,
      showMark: false,
    }));

    return { xValues: allDates, series };
  }, [storageCostData]);

  const { xValues, series } = chartData;

  if (!series.length) {
    return (
      <Card
        sx={{
          bgcolor: "background.paper",
          color: "black",
          borderRadius: 2,
          boxShadow: 4,
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">No storage cost data available</Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        color: "black",
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Storage Costs Over Time by Product
        </Typography>

        <Box sx={{ width: "100%", height: 400 }}>
          <LineChart
            xAxis={[
              {
                data: xValues,
                scaleType: "time",
                tickLabelStyle: { fill: "#bbb", fontSize: 12 },
                label: "Date",
                min: Math.min(...xValues),
                max: Math.max(...xValues),
                valueFormatter: (timestamp) =>
                  new Date(timestamp).toLocaleDateString("en-GB", {
                    month: "short",
                    day: "numeric",
                    year: "2-digit",
                  }),
              },
            ]}
            yAxis={[
              {
                label: "Storage Cost",
                tickLabelStyle: { fill: "#bbb" },
              },
            ]}
            series={series}
            height={400}
            margin={{ top: 30, right: 30, bottom: 50, left: 70 }}
            grid={{ vertical: false, horizontal: true }}
            slotProps={{
              legend: {
                direction: "row" as any,
                position: { vertical: "top", horizontal: "center" },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
