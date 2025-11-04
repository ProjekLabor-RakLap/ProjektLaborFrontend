import { Box, Chip, Card } from "@mui/material";
import WeeklySalesCard from "../Statistics/WeeklySalesCard";
import MostSoldProductCard from "../Statistics/MostSoldProductCard";
import ProductsSoldChartCard from "../Statistics/ProductsSoldChartCard";
import UnpopularProductsCard from "../Statistics/UnpopularProductsCard";

export default function WarehouseDashboard({
  selectedWarehouse,
  ...props
}: any) {
  if (!selectedWarehouse) return null;

  const cards = [
    { label: "Previous Week Sales", color: "primary", content: <WeeklySalesCard {...props} /> },
    { label: "Most Sold Product", color: "primary", content: <MostSoldProductCard {...props} /> },
    { label: "Products Overall Sold", color: "primary", content: <ProductsSoldChartCard {...props} /> },
    { label: "Unpopular Products", color: "error", content: <UnpopularProductsCard {...props} /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "50px",
        marginBottom: "50px",
        flexWrap: "wrap",
      }}
    >
      {cards.map(({ label, color, content }) => (
        <Box
          key={label}
          sx={{
            flex: 1,
            minWidth: 350,
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Chip label={label} color={color as "primary" | "error"} sx={{ mb: 1, fontWeight: "bold" }} />
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
  );
}
