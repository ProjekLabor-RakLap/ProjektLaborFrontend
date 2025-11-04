import { Box, Chip, Card, useTheme } from "@mui/material";
import WeeklySalesCard from "../Statistics/WeeklySalesCard";
import MostSoldProductCard from "../Statistics/MostSoldProductCard";
import ProductsSoldChartCard from "../Statistics/ProductsSoldChartCard";
import UnpopularProductsCard from "../Statistics/UnpopularProductsCard";
import WarehouseStockScatterChart from "../Statistics/StockChangesScatterCard";

export default function WarehouseDashboard({
  selectedWarehouse,
  ...props
}: any) {
  const theme = useTheme();

  if (!selectedWarehouse) return null;

  const topCards = [
    { label: "Previous Week Sales", color: "primary", content: <WeeklySalesCard {...props} /> },
    { label: "Most Sold Product", color: "primary", content: <MostSoldProductCard {...props} /> },
    { label: "Products Overall Sold", color: "primary", content: <ProductsSoldChartCard {...props} /> },
    { label: "Unpopular Products", color: "error", content: <UnpopularProductsCard {...props} /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: "40px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "40px",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {topCards.map(({ label, color, content }) => (
            <Box
              key={label}
              sx={{
                flex: "1 1 350px",
                maxWidth: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Chip
                label={label}
                color={color as "primary" | "error"}
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  bgcolor: color,
                  color: "white",
                }}
              />
              <Card
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: 450,
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                {content}
              </Card>
            </Box>
          ))}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Chip
            label="All Warehouse Stock Changes"
            color="primary"
            sx={{
              mb: 2,
              fontWeight: "bold",
              bgcolor: theme.palette.primary.main,
              color: "white",
            }}
          />
          <Card
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 3,
              p: 2,
            }}
          >
            <WarehouseStockScatterChart {...props} />
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
