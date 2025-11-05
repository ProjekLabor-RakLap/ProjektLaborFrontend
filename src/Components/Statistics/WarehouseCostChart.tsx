import React, { useMemo } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { IWarehouseCost, IProductStockChanges } from "../../Interfaces/IWarehouseCost";
import { IStockChange } from "../../Interfaces/IStockChange";

interface WarehouseCostChartProps {
  warehouseCostData: IWarehouseCost;
}

export default function WarehouseCostChart({ warehouseCostData }: WarehouseCostChartProps) {
  const chartData = useMemo(() => {
    if (!warehouseCostData?.productStockChanges?.length) return { xValues: [], series: [] };

    const productCostMap = new Map<string, Map<number, number>>();

    warehouseCostData.productStockChanges.forEach((item: IProductStockChanges) => {
      if (!item?.stockChanges || !item?.stock) return;
      const productName = item.product?.name ?? "Unknown Product";
      const transportCost = item.stock.transportCost ?? 0;

      const dateMap = productCostMap.get(productName) ?? new Map<number, number>();

      item.stockChanges.forEach((change: IStockChange) => {
        if (change.quantity < 0) {
          const date = new Date(change.changeDate);
          const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
          const cost = Math.abs(change.quantity) * transportCost;
          dateMap.set(day, (dateMap.get(day) || 0) + cost);
        }
      });

      productCostMap.set(productName, dateMap);
    });

    const allDates = Array.from(
      new Set(
        Array.from(productCostMap.values()).flatMap((dateMap) => Array.from(dateMap.keys()))
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
  }, [warehouseCostData]);

  const { xValues, series } = chartData;

  if (!series.length) {
    return (
      <Card
        sx={{
          bgcolor: "background.paper",
          color: "white",
          borderRadius: 2,
          boxShadow: 4,
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">No transport cost data available</Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        color: "white",
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Transport Costs Over Time by Product
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
                label: "Transport Cost",
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
