import React from "react";
import {
  Box,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IWarehouse } from "../../Interfaces/IWarehouse";
import { IProduct } from "../../Interfaces/IProduct";

interface WarehouseProductSelectorProps {
  warehouses: IWarehouse[];
  products: IProduct[];
  selectedWarehouse: number | null | undefined;
  selectedProduct: number | null | undefined;
  loadingWarehouses: boolean;
  loadingProducts: boolean;
  onSelectWarehouse: (warehouseId: number) => void;
  onSelectProduct: (productId: number) => void;
  getWarehouseName: (id: number | null | undefined) => string;
  getProductName: (id: number | null | undefined) => string;
}

const WarehouseProductSelector: React.FC<WarehouseProductSelectorProps> = ({
  warehouses,
  products,
  selectedWarehouse,
  selectedProduct,
  loadingWarehouses,
  loadingProducts,
  onSelectWarehouse,
  onSelectProduct,
  getWarehouseName,
  getProductName,
}) => {
  const handleWarehouseChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    onSelectWarehouse(value);
  };

  const handleProductChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    onSelectProduct(value);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "2rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <InputLabel
          variant="standard"
          htmlFor="warehouse-select"
          sx={{ color: "white", mb: 1, marginTop: 10 }}
        >
          Warehouse
        </InputLabel>

        {loadingWarehouses ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress sx={{ color: "white" }} />
          </Box>
        ) : (
          <Select
            value={selectedWarehouse ?? ""}
            onChange={handleWarehouseChange}
            displayEmpty
            renderValue={(selected) =>
              !selected ? (
                <span style={{ color: "#888" }}>Select a warehouse</span>
              ) : (
                getWarehouseName(selected)
              )
            }
            sx={{
              width: 300,
              bgcolor: "white",
              color: "black",
              borderRadius: 1,
              marginBottom: "20px",
            }}
            inputProps={{ id: "warehouse-select" }}
          >
            {warehouses.map((warehouse) => (
              <MenuItem key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </div>
      {selectedWarehouse && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <InputLabel
            variant="standard"
            htmlFor="product-select"
            sx={{ color: "white", mb: 1 }}
          >
            Product
          </InputLabel>

          {loadingProducts ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress sx={{ color: "white" }} />
            </Box>
          ) : (
            <Select
              value={selectedProduct ?? ""}
              onChange={handleProductChange}
              displayEmpty
              renderValue={(selected) =>
                !selected ? (
                  <span style={{ color: "#888" }}>Select a product</span>
                ) : (
                  getProductName(selected)
                )
              }
              sx={{
                width: 300,
                bgcolor: "white",
                color: "black",
                borderRadius: 1,
                marginBottom: "20px",
              }}
              inputProps={{ id: "product-select" }}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
      )}
    </div>
  );
};

export default WarehouseProductSelector;