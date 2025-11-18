import React from "react";
import { CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

export default function MostSoldProductCard({ mostsold }: any) {
  return (
    <CardActionArea sx={{ flexGrow: 1 }}>
      <CardMedia
        component="img"
        image={`data:image/png;base64,${mostsold?.image ?? ""}`}
        alt={mostsold?.name}
        sx={{ height: 200, objectFit: "contain", bgcolor: "background.paper", p: 1 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{mostsold?.name}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {mostsold?.description || "No description available."}
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
          EAN: {mostsold?.ean}
        </Typography>
      </CardContent>
    </CardActionArea>
  );
}
