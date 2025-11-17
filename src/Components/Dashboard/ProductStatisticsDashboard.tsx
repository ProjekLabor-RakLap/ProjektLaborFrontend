import React from "react";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import StockLineChart from "../Statistics/StockLineChart";
import CapacityPieChart from "../Statistics/CapacityPieChart";
import MovingAverageCard from "../Statistics/MovingAverageCard";

interface Stock {
  stockInWarehouse: number;
  warehouseCapacity: number;
  stockInStore: number;
  storeCapacity: number;
}

interface StockOverviewProps {
  selectedProduct: number | null;
  selectedWarehouse: number | null | undefined;
  loadingStockChanges: boolean;
  loadingStock: boolean;
  chartData: { date: Date; quantity: number }[];
  stock?: Stock;
  movingAverage?: number | null;
  fetchMovingAverage?: () => Promise<void>;
  loadingMovingAverage?: boolean;
  movingAverageError?: string | null;
}

const StockOverview: React.FC<StockOverviewProps> = ({
  selectedProduct,
  selectedWarehouse,
  loadingStockChanges,
  loadingStock,
  chartData,
  stock,
}) => {
  if (!selectedProduct) return null;

  if (loadingStockChanges || loadingStock) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    );
  }

  if (chartData.length === 0) {
    return <Typography>No stock changes available.</Typography>;
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2em" }}>
        <Chip
          label="Product Statistics"
          color="primary"
          sx={{
            mb: 1,
            fontWeight: "bold",
            bgcolor: "primary",
            color: "white",
          }}
        />
      </div>

      <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 3,
    mt: 3,
  }}
>

  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      flex: 1,
      maxWidth: 800,
      mx: "auto",
    }}
  >
    <Chip
      label="Stock Changes of the Product"
      color="primary"
      sx={{ mb: 1, fontWeight: "bold", bgcolor: "primary", color: "white" }}
    />
    <StockLineChart chartData={chartData} />
  </Box>

  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      flex: 1,
      maxWidth: 500,
      mx: "auto",
    }}
  >
    <MovingAverageCard
      selectedProduct={selectedProduct}
      selectedWarehouse={selectedWarehouse ?? null}
    />
  </Box>

  {stock && (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 4,
        mt: 2,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Chip
          label="Store Capacity"
          color="primary"
          sx={{ mb: 1, fontWeight: "bold", bgcolor: "primary", color: "white" }}
        />
        <CapacityPieChart
          title="Store Capacity"
          colors={["green", "blue"]}
          data={[
            { id: 0, value: stock.stockInStore, label: "In Store" },
            {
              id: 1,
              value: stock.storeCapacity - stock.stockInStore,
              label: "Free Space",
            },
          ]}
        />
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Chip
          label="Warehouse Capacity"
          color="primary"
          sx={{ mb: 1, fontWeight: "bold", bgcolor: "primary", color: "white" }}
        />
        <CapacityPieChart
          title="Warehouse Capacity"
          colors={["green", "blue"]}
          data={[
            { id: 0, value: stock.stockInWarehouse, label: "In Warehouse" },
            {
              id: 1,
              value: stock.warehouseCapacity - stock.stockInWarehouse,
              label: "Free Space",
            },
          ]}
        />
      </Box>
    </Box>
  )}

</Box>
    </>
  );
};

export default StockOverview;
