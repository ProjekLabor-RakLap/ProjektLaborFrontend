import React from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import StockLineChart from "../Statistics/StockLineChart";
import CapacityPieChart from "../Statistics/CapacityPieChart";

interface Stock {
  stockInWarehouse: number;
  warehouseCapacity: number;
  stockInStore: number;
  storeCapacity: number;
}

interface StockOverviewProps {
  selectedProduct: number |null;
  loadingStockChanges: boolean;
  loadingStock: boolean;
  chartData: { date: Date; quantity: number }[];
  stock?: Stock;
}

const StockOverview: React.FC<StockOverviewProps> = ({
  selectedProduct,
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
    <Grid container spacing={3} justifyContent="center" alignItems="flex-start" sx={{ mt: 3 }}>
      <Grid>
        <StockLineChart chartData={chartData} />
      </Grid>

      {stock && (
        <>
          <Grid>
            <CapacityPieChart
                title="Store Capacity"
                colors={["green", "blue"]}
                data={[
                { id: 0, value: stock.stockInStore, label: "In Store" },
                { id: 1, value: stock.storeCapacity - stock.stockInStore, label: "Free Space" },
                ]}
            />
            </Grid>

          <Grid>
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
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default StockOverview;