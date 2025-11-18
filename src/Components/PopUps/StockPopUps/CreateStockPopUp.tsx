import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import BlockIcon from "@mui/icons-material/Block";
import "../PopUpCSS.css";
import { IStock,ICreateStock,IStockForTable,IStockWithId,} from "../../../Interfaces/IStock";
import api from "../../../api/api";
import SelectWarehouse from "../../Inputs/Select/SelectWarehouse";
import SelectProduct from "../../Inputs/Select/SelectProduct";
import { IWarehouse } from "../../../Interfaces/IWarehouse";
import { IProduct } from "../../../Interfaces/IProduct";
import { Box } from "@mui/material";

interface FormDialogProps<T> {
  text: string;
  dialogTitle: string;
  dialogContent: string;
  acceptText: string;
  cancelText: string;
  warehouses?: IWarehouse[];
  products?: IProduct[];
  onUpdate?: (updated: IStock) => void;
}

export default function CreateStockDialog<T>({
  text,
  dialogTitle,
  dialogContent,
  acceptText,
  cancelText,
  warehouses,
  products,
  onUpdate,
}: FormDialogProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = React.useState<"success" | "error">("success");
  const [selectedWarehouseId, setSelectedWarehouseId] = React.useState<number>(0);
  const [selectedProductId, setSelectedProductId] = React.useState<number>(0);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createStock = async (newStock: ICreateStock) => {
    try {
      const response = await api.Stocks.createStock(newStock);

      if (response.status >= 200 && response.status < 300) {
        setAlertSeverity("success");
        setAlertMessage("Stock created successfully!");

        const createdStock: IStock = response.data as unknown as IStock;
        onUpdate?.(createdStock);
        handleClose();
        return true;
      }

      throw new Error(`Unexpected status code: ${response.status}`);
    } catch (error: any) {
      console.error("Error creating stock:", error);

      let message = "Unknown error occurred.";

      if (error.response) {
        message =
          error.response.data?.message || `HTTP ${error.response.status}`;
      } else if (error.request) {
        message = "No response from server.";
      } else {
        message = error.message;
      }

      setAlertSeverity("error");
      setAlertMessage(message);
      return false;
    }
  };

  const handleWarehouseChange = (id: number) => {
    setSelectedWarehouseId(id);
    console.log("Selected warehouse ID:", id);
  };
 
  const handleProductChange = (id: number) => {
    setSelectedProductId(id);
    console.log("Selected warehouse ID:", id);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newStock: ICreateStock = {
      stockInWarehouse: formData.get("stockInWarehouse") as unknown as number,
      stockInStore: formData.get("stockInStore") as unknown as number,
      warehouseCapacity: formData.get("warehouseCapacity") as unknown as number,
      storeCapacity: formData.get("storeCapacity") as unknown as number,
      productId: selectedProductId,
      currency: formData.get("currency") as string,
      price: formData.get("price") as unknown as number,
      warehouseId: selectedWarehouseId,
      transportCost: formData.get("transportCost") ? (formData.get("transportCost") as unknown as number) : undefined,
      storageCost: formData.get("storageCost") ? (formData.get("storageCost") as unknown as number) : undefined,
      whenToNotify: formData.get("whenToNotify") ? (formData.get("whenToNotify") as unknown as number) : undefined,
      whenToWarn: formData.get("whenToWarn") ? (formData.get("whenToWarn") as unknown as number) : undefined,
    };

    const success = await createStock(newStock);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="createButton"
      >
        {text}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>

          {alertMessage && (
            <Alert
              icon={<BlockIcon fontSize="inherit" />}
              severity={alertSeverity}
              onClose={() => setAlertMessage(null)}
              style={{ marginBottom: "1rem" }}
            >
              {alertMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit} id="warehouse-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="stockInWarehouse"
              name="stockInWarehouse"
              label="Stock in warehouse"
              type="text"
              fullWidth
              variant="standard"
              defaultValue=""
            />
            <TextField
              required
              margin="dense"
              id="stockInStore"
              name="stockInStore"
              label="Stock in store"
              type="text"
              fullWidth
              variant="standard"
              defaultValue=""
            />
            <TextField
              required
              margin="dense"
              id="warehouseCapacity"
              name="warehouseCapacity"
              label="Warehouse capacity"
              type="text"
              fullWidth
              variant="standard"
              defaultValue=""
            />
            <TextField
              required
              margin="dense"
              id="storeCapacity"
              name="storeCapacity"
              label="Store Capacity"
              type="text"
              fullWidth
              variant="standard"
              defaultValue=""
            />
            <TextField
              required
              margin="dense"
              id="price"
              name="price"
              label="Price"
              type="text"
              fullWidth
              variant="standard"
              defaultValue=""
            />
            <TextField
              required
              margin="dense"
              id="currency"
              name="currency"
              label="Currency"
              type="currency"
              fullWidth
              variant="standard"
              defaultValue=""
            />
            <TextField
              margin="dense"
              id="transportCost"
              name="transportCost"
              label="Transport cost"
              type="text"
              fullWidth
              variant="standard"
              defaultValue="0"
            />
            <TextField
              margin="dense"
              id="storageCost"
              name="storageCost"
              label="Storage cost"
              type="text"
              fullWidth
              variant="standard"
              defaultValue="0"
            />
            <TextField
              margin="dense"
              id="whenToNotify"
              name="whenToNotify"
              label="Notify when stock below (%)"
              type="percentage"
              fullWidth
              variant="standard"
              defaultValue=""
            />
            <TextField
              margin="dense"
              id="whenToWarn"
              name="whenToWarn"
              label="Warn when stock below (%)"
              type="percentage"
              fullWidth
              variant="standard"
              defaultValue=""
            />
            <Box sx={{ display: 'flex', justifyContent:'space-between', gap: 2, marginTop: 2 }}>
              <SelectWarehouse
                warehouses={warehouses}
                onWarehouseChange={handleWarehouseChange}
              />
              <SelectProduct
                products={products}
                onProductChange={handleProductChange}
              />
            </Box>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} className="cancelButton">
            {cancelText}
          </Button>
          <Button type="submit" form="warehouse-form" className="createButton">
            {acceptText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
