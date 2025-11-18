import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, CircularProgress } from "@mui/material";
import axiosInstance from "api/axois.config";

interface MovingAverageCardProps {
  selectedProduct: number | null;
  selectedWarehouse: number | null;
}

const MovingAverageCard: React.FC<MovingAverageCardProps> = ({ selectedProduct, selectedWarehouse }) => {
  const [windowSize, setWindowSize] = useState<number>(3);
  const [movingAverage, setMovingAverage] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovingAverage = async () => {
    if (!selectedProduct || !selectedWarehouse) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<string>(
        `/api/stockchange/calculate-moving-average/${selectedProduct}?warehouseId=${selectedWarehouse}&window=${windowSize}`
      );

      const match = response.data.match(/: ([\d.]+)/);
      if (match) {
        setMovingAverage(parseFloat(match[1]));
      } else {
        setError("Unexpected response from server");
        setMovingAverage(null);
      }
    } catch (err) {
      setError("Failed to fetch moving average");
      setMovingAverage(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovingAverage();
  }, [selectedProduct, selectedWarehouse, windowSize]);

  if (!selectedProduct || !selectedWarehouse) return null;

  return (
    <Card sx={{ minWidth: 275, mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Moving Average
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <TextField
            label="Window Size"
            type="number"
            value={windowSize}
            onChange={(e) => setWindowSize(Number(e.target.value))}
            inputProps={{ min: 1 }}
          />

          <Button variant="contained" onClick={fetchMovingAverage}>
            Calculate
          </Button>
        </Box>

        {loading ? (
          <CircularProgress size={24} />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : movingAverage !== null ? (
          <Typography>
            Moving average for a window size of {windowSize}: {movingAverage.toFixed(2)}
          </Typography>
        ) : (
          <Typography>No data available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MovingAverageCard;
