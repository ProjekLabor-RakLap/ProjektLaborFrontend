import React from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { IUserGet } from 'Interfaces/IUser';
import { IWarehouse } from 'Interfaces/IWarehouse';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  warehouses: IWarehouse[];
  selectedUser: IUserGet | null;
  selectedWarehouses: number[];
  setSelectedWarehouses: React.Dispatch<React.SetStateAction<number[]>>;
}

export const AssignWarehouseDialog: React.FC<Props> = ({
  open,
  onClose,
  onSave,
  warehouses,
  selectedUser,
  selectedWarehouses,
  setSelectedWarehouses,
}) => {
  const handleWarehouseChange = (event: any) => {
    const { value } = event.target;
    setSelectedWarehouses(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Assign Warehouses to {selectedUser ? selectedUser.firstname : 'User'}
      </DialogTitle>

      <FormControl sx={{ m: 2, width: 300 }}>
        <InputLabel id="warehouse-multiple-checkbox-label">Warehouses</InputLabel>
        <Select
          labelId="warehouse-multiple-checkbox-label"
          id="warehouse-multiple-checkbox"
          multiple
          value={selectedWarehouses}
          onChange={handleWarehouseChange}
          input={<OutlinedInput label="Warehouses" />}
          renderValue={(selected) => {
            const names = selected
              .map((id) => warehouses.find((w) => w.id === id)?.name)
              .filter(Boolean);
            return names.join(', ');
          }}
        >
          {warehouses.map((warehouse) => (
            <MenuItem key={warehouse.id} value={warehouse.id}>
              <Checkbox checked={selectedWarehouses.includes(warehouse.id)} />
              <ListItemText primary={warehouse.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained" color="primary" sx={{ ml: 1 }}>
          Save
        </Button>
      </div>
    </Dialog>
  );
};
