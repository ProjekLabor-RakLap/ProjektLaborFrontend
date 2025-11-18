import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../PopUpCSS.css';
import { IWarehouse } from '../../../Interfaces/IWarehouse';
import api from '../../../api/api'

interface FormDialogProps {
  id: number;
  text: string;
  dialogTitle: string;
  dialogContent: string;
  acceptText: string;
  cancelText: string;
  onUpdate?: (updated: number) => void;
  onNotify: (message: string, severity: 'success' | 'error') => void;
}

export default function DeleteWarehouseDialog({
  id,
  text,
  dialogTitle,
  dialogContent,
  acceptText,
  cancelText,
  onUpdate,
  onNotify,
}: FormDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteWarehouse = async (id: number) => {
    try {
      await api.Warehouses.deleteWarehouse(id);
      onNotify('Warehouse deleted successfully!', 'success');
      onUpdate?.(id);
      console.log("Warehouse deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting warehouse:", error.message || error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An unknown error occurred while deleting the product.';
      onNotify(errorMessage, 'error');
    }
  };

  const handleDelete = async () => {
    await deleteWarehouse(id);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} className="deleteButton">
        {text}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="cancelDeleteButton">
            {cancelText}
          </Button>
          <Button onClick={handleDelete} className="deleteButton">
            {acceptText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
