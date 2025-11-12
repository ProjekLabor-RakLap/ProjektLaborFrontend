import React from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';
import DeleteIcon from '@mui/icons-material/Delete';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { IUserGet } from 'Interfaces/IUser';
import { IWarehouse } from 'Interfaces/IWarehouse';

interface Props {
  users: IUserGet[];
  warehouses: IWarehouse[];
  onAssignClick: (user: IUserGet) => void;
  onDeleteClick: (userId: number) => void;
}

export const UserTable: React.FC<Props> = ({
  users,
  warehouses,
  onAssignClick,
  onDeleteClick,
}) => {
  const columns = [
    { width: 80, label: 'Actions', dataKey: 'actions' },
    { width: 150, label: 'First Name', dataKey: 'firstname' },
    { width: 150, label: 'Last Name', dataKey: 'lastname' },
    { width: 200, label: 'Email', dataKey: 'email' },
    { width: 200, label: 'Role', dataKey: 'role' },
    { width: 150, label: 'Verified', dataKey: 'isVerified' },
    { width: 300, label: 'Warehouses', dataKey: 'warehouses' },
  ];

  const rowContent = (_index: number, user: IUserGet) => {
    const assignedNames =
      user.warehouseIds
        ?.map((id) => warehouses.find((w) => w.id === id)?.name)
        .filter(Boolean)
        .join(', ') || '—';

    return (
      <>
        <TableCell>
          <IconButton color="primary" onClick={() => onAssignClick(user)}>
            <WarehouseIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDeleteClick(user.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell>{user.firstname}</TableCell>
        <TableCell>{user.lastname}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.isVerified ? 'Yes' : 'No'}</TableCell>
        <TableCell>{assignedNames}</TableCell>
      </>
    );
  };

  return (
    <Paper style={{ height: 500, width: '90%', maxWidth: 1000 }}>
      <TableVirtuoso
        data={users}
        fixedHeaderContent={() => (
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.dataKey}
                style={{ width: column.width, fontWeight: 'bold' }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        )}
        itemContent={rowContent}
        components={{
          Scroller: TableContainer,
          Table: (props) => <Table {...props} size="small" />,
          TableHead,
          TableRow,
          TableBody,
        }}
      />
    </Paper>
  );
};
