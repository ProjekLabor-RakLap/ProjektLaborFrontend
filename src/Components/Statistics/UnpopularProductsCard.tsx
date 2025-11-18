import React from "react";
import {
  List, ListItem, ListItemText, ListItemAvatar,
  Avatar, Divider, ListSubheader, Typography
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function UnpopularProductsCard({ stuckProducts }: any) {
  return (
    <List
      sx={{ flexGrow: 1, overflow: "auto", maxHeight: "100%" }}
      subheader={
        <ListSubheader
          sx={{
            bgcolor: "background.paper",
            fontWeight: "bold",
            color: "error.main",
            textAlign: "center",
          }}
        >
          Unpopular Products
        </ListSubheader>
      }
    >
      {stuckProducts && stuckProducts.length > 0 ? (
        stuckProducts.map((product: any) => (
          <React.Fragment key={product.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "error.main" }}>
                  <InventoryIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                    {product.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      EAN: {product.ean}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description || "No description available"}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))
      ) : (
        <ListItem>
          <ListItemText
            primary="No stuck products found"
            sx={{ textAlign: "center", color: "text.secondary" }}
          />
        </ListItem>
      )}
    </List>
  );
}
