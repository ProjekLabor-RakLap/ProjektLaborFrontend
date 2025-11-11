import { Avatar, Button, Checkbox, Dialog, DialogTitle, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import '../../App.css';
import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import { IUser } from 'Interfaces/IUser';
import React from 'react';
import { useWarehouseStatistics } from 'Components/hooks/useUser';
import Person3Icon from '@mui/icons-material/Person3';
import api from 'api/api';

function Admin() {
  const { users, warehouses, refreshData } = useWarehouseStatistics();
  const [open, setOpen] = React.useState(false);
  const [openWarehouse, setOpenWarehouse] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);
  const [selectedWarehouses, setSelectedWarehouses] = React.useState<string[]>([]);
  const [initialWarehouses, setInitialWarehouses] = React.useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseWarehouse = () => {
    setOpenWarehouse(false);
  }

  const handleListItemClick = (userId: number) => {
  const user = users?.find((u: IUser) => u.id === userId);
  if (!user) return;

  const assigned = Array.isArray(user.warehouseNames)
    ? user.warehouseNames
    : (user.warehouseNames ? [user.warehouseNames] : []);

  setSelectedUser(user);
  setSelectedWarehouses(assigned);
  setInitialWarehouses(assigned);
  setOpen(false);
  setOpenWarehouse(true);
};

  const handleWarehouseChange = (event: any) => {
    const { value } = event.target;
    setSelectedWarehouses(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSaveWarehouses = async () => {
    if (!selectedUser || !warehouses) return;
    const userId = selectedUser.id;
    const added = selectedWarehouses.filter((name) => !initialWarehouses.includes(name));
    const removed = initialWarehouses.filter((name) => !selectedWarehouses.includes(name));
    for (const warehouseName of added) {
      const warehouse = warehouses.find((w) => w.name === warehouseName);
      if (warehouse) {
        try {
          await api.Users.userAssignWarehousePatch(userId, warehouse.id);
          console.log(`✅ Added ${warehouseName} to ${selectedUser.firstname}`);
        } catch (err) {
          console.error(`❌ Failed to add ${warehouseName}`, err);
        }
      }
    }
    for (const warehouseName of removed) {
      const warehouse = warehouses.find((w) => w.name === warehouseName);
      if (warehouse) {
        try {
          await api.Users.userAssignWarehouseDelete(userId, warehouse.id);
          console.log(`🗑️ Removed ${warehouseName} from ${selectedUser.firstname}`);
        } catch (err) {
          console.error(`❌ Failed to remove ${warehouseName}`, err);
        }
      }
    }
    await refreshData();
    setOpenWarehouse(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <PillNavFull/>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Assign Warehouses To User</Button>
      <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users && users.map((user: IUser) => (
          <ListItem disablePadding key={user.id}>
            <ListItemButton onClick={() => handleListItemClick(user.id)}>
              <ListItemAvatar>
                <Avatar>
                  <Person3Icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.firstname + ' ' + user.lastname} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
    <Dialog open={openWarehouse} onClose={handleCloseWarehouse}>
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
              renderValue={(selected) => selected.join(', ')}
            >
              {warehouses && warehouses.map((warehouse) => (
                <MenuItem key={warehouse.id} value={warehouse.name}>
                  <Checkbox checked={selectedWarehouses.includes(warehouse.name)} />
                  <ListItemText primary={warehouse.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
            <Button onClick={handleCloseWarehouse}>Cancel</Button>
            <Button onClick={handleSaveWarehouses} variant="contained" color="primary" sx={{ ml: 1 }}>
              Save
            </Button>
          </div>
        </Dialog>
      </header>
    </div>
  );
}

export default Admin;
