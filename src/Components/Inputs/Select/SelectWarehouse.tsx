import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IWarehouse } from '../../../Interfaces/IWarehouse';
import './SelectWarehouseCss.css';

interface Props {
  warehouses?: IWarehouse[];
  onWarehouseChange: (id: number) => void;
}

export default function SelectWarehouse({ warehouses, onWarehouseChange }: Props) {
  const [selectedWarehouse, setSelectedWarehouse] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as unknown as number;
    setSelectedWarehouse(String(newValue));
    onWarehouseChange(newValue);
  };

  return (
    <Box sx={{ minWidth: 120 }} className="selectWarehouse">
      <FormControl fullWidth>
        <Select
          labelId="warehouse-select"
          id="input-select"
          value={selectedWarehouse}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: '#888' }}>Select Warehouse</span>;
            }
            const wh = warehouses!.find(w => String(w.id) === selected);
            return wh ? wh.name : '';
          }}
        >
          {Array.isArray(warehouses) && warehouses.map((wh) => (
            <MenuItem key={wh.id} value={wh.id} className="menuItem">
              {wh.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
