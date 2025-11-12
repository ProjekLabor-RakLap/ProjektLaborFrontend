import React from "react";
import api from "api/api";
import { IUserGet } from "Interfaces/IUser";
import { IWarehouse } from "Interfaces/IWarehouse";

export function useUser() {
  const [users, setUsers] = React.useState<IUserGet[]>([]);
  const [warehouses, setWarehouses] = React.useState<IWarehouse[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchUsers = async () => {
    const response = await api.Users.getUsers();
    setUsers(response.data);
  };

  const fetchWarehouses = async () => {
    const response = await api.Warehouses.getWarehouses();
    setWarehouses(response.data);
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchWarehouses()]);
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    refreshData();
  }, []);

  const assignWarehouses = async (
    userId: number,
    selectedWarehouses: number[],
    initialWarehouses: number[]
  ) => {
    try {
      const added = selectedWarehouses.filter((id) => !initialWarehouses.includes(id));
      const removed = initialWarehouses.filter((id) => !selectedWarehouses.includes(id));

      for (const warehouseId of added) {
        await api.Users.assignUserWarehouse({ userId, warehouseId });
      }
      for (const warehouseId of removed) {
        await api.Users.unAssignUserWarehouse({ userId, warehouseId });
      }

      await refreshData();
    } catch (err) {
      console.error("Failed to update warehouse assignments", err);
      throw err;
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await api.Users.deleteUser(userId);
      await refreshData();
    } catch (err) {
      console.error(`Failed to delete user ${userId}`, err);
      throw err;
    }
  };

  return {
    users,
    warehouses,
    loading,
    error,
    refreshData,
    assignWarehouses,
    deleteUser,
  };
}
