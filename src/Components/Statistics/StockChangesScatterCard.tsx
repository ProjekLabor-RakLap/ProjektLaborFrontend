import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { IStockChange } from '../../Interfaces/IStockChange';

interface WarehouseStockScatterChartProps {
  stockChangesByWarehouse: IStockChange[];
  loading: boolean;
}

const WarehouseStockScatterChart: React.FC<WarehouseStockScatterChartProps> = ({
  stockChangesByWarehouse,
  loading,
}) => {
  const groupedData = useMemo(() => {
    if (!stockChangesByWarehouse?.length) return {};
    const groups: Record<string, { x: number; y: number }[]> = {};
    stockChangesByWarehouse.forEach((change) => {
      const productName = change.product?.name ?? 'Unknown';
      if (!groups[productName]) groups[productName] = [];
      groups[productName].push({
        x: new Date(change.changeDate).getTime(),
        y: change.quantity,
      });
    });
    return groups;
  }, [stockChangesByWarehouse]);

  const series = useMemo(() => {
    const COLORS = ['#c1121f', '#8338ec', '#3a86ff', '#001524', '#fb6f92', '#38b000'];

    return Object.entries(groupedData).map(([productName, data], index) => ({
      id: productName,
      label: productName,
      data,
      color: COLORS[index % COLORS.length],
      markerSize: 8,
      valueFormatter: (point: any) => {
        const date = new Date(point.x).toLocaleString('en-GB', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
        return `Date: ${date}\nQuantity: ${point.y}`;
    },
    }));
  }, [groupedData]);

  if (loading) {
    return (
      <Card
        sx={{
          bgcolor: '#1e1e1e',
          color: 'white',
          borderRadius: 2,
          boxShadow: 3,
          minHeight: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ color: 'white' }} />
      </Card>
    );
  }

  if (!stockChangesByWarehouse?.length) {
    return (
      <Card
        sx={{
          bgcolor: '#ffffff',
          color: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6">No stock changes available</Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        color: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom color='black'>
          Stock Changes by Products
        </Typography>

        <Box sx={{ width: '100%', height: 400 }}>
          <ScatterChart
            xAxis={[
              {
                label: 'Date',
                scaleType: 'time',
                valueFormatter: (value) =>
                  new Date(value).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  }),
              },
            ]}
            yAxis={[{ label: 'Quantity Change' }]}
            series={series}
            sx={{
              width: '100%',
              height: '100%',
              '& .MuiChartsLegend-root': {
                mt: 2,
              },
            }}
            margin={{ top: 30, right: 30, bottom: 50, left: 70 }}
            slotProps={{
              legend: {
                direction: 'row' as any,
                position: { vertical: 'bottom', horizontal: 'center' },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default WarehouseStockScatterChart;
