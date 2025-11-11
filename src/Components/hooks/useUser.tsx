import api from "api/api";
import { IUser } from "Interfaces/IUser";
import { IWarehouse } from "Interfaces/IWarehouse";
import React from "react";

export function useWarehouseStatistics() {
  const [users, setUsers] = React.useState<IUser[]>();
  const [warehouses, setWarehouses] = React.useState<IWarehouse[]>();

  const fetchUsers = async () => {
    const response = await api.Users.getUsers();
    setUsers(response.data);
  };

  const fetchWarehouses = async () => {
    const response = await api.Warehouses.getWarehouses();
    setWarehouses(response.data);
  };

  React.useEffect(() => {
    fetchUsers();
    fetchWarehouses();
  }, []);

  const refreshData = async () => {
    await Promise.all([fetchUsers(), fetchWarehouses()]);
  };

  return { users, warehouses, refreshData };
}
