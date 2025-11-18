import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IProduct } from '../../../Interfaces/IProduct';
import './SelectWarehouseCss.css';

interface Props {
  products?: IProduct[];
  onProductChange: (id: number) => void;
}

export default function SelectProduct({ products, onProductChange }: Props) {
  const [selectedWarehouse, setSelectedWarehouse] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as unknown as number;
    setSelectedWarehouse(String(newValue));
    onProductChange(newValue);
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
              return <span style={{ color: '#888' }}>Select Product</span>;
            }
            const wh = products!.find(w => String(w.id) === selected);
            return wh ? wh.name : '';
          }}
        >
          {Array.isArray(products) && products.map((wh) => (
            <MenuItem key={wh.id} value={wh.id} className="menuItem">
              {wh.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
