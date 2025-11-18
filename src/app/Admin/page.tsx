import React from 'react';
import { IUserGet } from 'Interfaces/IUser';
import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import { useUser } from '../../Components/hooks/useUser';
import { AssignWarehouseDialog } from 'Components/Dialog/AssignWarehouseDialog';
import { UserTable } from 'Components/DataTable/UserTable';

function AdminPage() {
  const {
    users,
    warehouses,
    assignWarehouses,
    deleteUser,
  } = useUser();

  const [openWarehouse, setOpenWarehouse] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<IUserGet | null>(null);
  const [selectedWarehouses, setSelectedWarehouses] = React.useState<number[]>([]);
  const [initialWarehouses, setInitialWarehouses] = React.useState<number[]>([]);

  const handleAssignClick = (user: IUserGet) => {
    const assigned = Array.isArray(user.warehouseIds)
      ? user.warehouseIds
      : user.warehouseIds
      ? [user.warehouseIds]
      : [];

    setSelectedUser(user);
    setSelectedWarehouses(assigned);
    setInitialWarehouses(assigned);
    setOpenWarehouse(true);
  };

  const handleCloseWarehouse = () => setOpenWarehouse(false);

  const handleSaveWarehouses = async () => {
    if (!selectedUser) return;
    await assignWarehouses(selectedUser.id, selectedWarehouses, initialWarehouses);
    setOpenWarehouse(false);
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <PillNavFull />
        <h2 style={{ margin: '1rem 0' }}>User Management</h2>

        <UserTable
          users={users}
          warehouses={warehouses}
          onAssignClick={handleAssignClick}
          onDeleteClick={handleDeleteUser}
        />

        <AssignWarehouseDialog
          open={openWarehouse}
          onClose={handleCloseWarehouse}
          onSave={handleSaveWarehouses}
          warehouses={warehouses}
          selectedUser={selectedUser}
          selectedWarehouses={selectedWarehouses}
          setSelectedWarehouses={setSelectedWarehouses}
        />
      </header>
    </div>
  );
}

export default AdminPage;