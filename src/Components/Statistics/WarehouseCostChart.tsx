import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

interface DataPoint {
  x: number; // timestamp
  v6: number;
  v7: number;
  v8: number;
}

const sampleData: DataPoint[] = [
  { x: new Date('2023-07-01').getTime(), v6: 5000, v7: 0, v8: 0 },
  { x: new Date('2023-10-01').getTime(), v6: 15000, v7: 0, v8: 0 },
  { x: new Date('2024-04-01').getTime(), v6: 60000, v7: 20000, v8: 0 },
  { x: new Date('2024-10-01').getTime(), v6: 90000, v7: 200000, v8: 0 },
  { x: new Date('2025-04-01').getTime(), v6: 120000, v7: 350000, v8: 200000 },
  { x: new Date('2025-11-01').getTime(), v6: 150000, v7: 370000, v8: 420000 },
];

export default function WarehouseCostChart() {
  const xValues = sampleData.map((d) => d.x);

  return (
    <Card
      sx={{
        bgcolor: '#0b0d10',
        color: 'white',
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Warehouse Stock Performance
        </Typography>

        <Box sx={{ width: '100%', height: 400 }}>
          <LineChart
            xAxis={[
              {
                data: xValues,
                scaleType: 'time',
                valueFormatter: (value) =>
                  new Date(value).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  }),
              },
            ]}
            series={[
              {
                data: sampleData.map((d) => d.v6),
                label: 'v6',
                color: '#1E88E5',
                area: true,
                showMark: false,
              },
              {
                data: sampleData.map((d) => d.v7),
                label: 'v7',
                color: '#FBC02D',
                area: true,
                showMark: false,
              },
              {
                data: sampleData.map((d) => d.v8),
                label: 'v8',
                color: '#E53935',
                area: true,
                showMark: false,
              },
            ]}
            width={800}
            height={400}
            margin={{ top: 30, right: 40, bottom: 40, left: 60 }}
            grid={{ vertical: false, horizontal: true }}
            slotProps={{
              legend: {
                direction: 'row' as any,
                position: { vertical: 'top', horizontal: 'center' },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
