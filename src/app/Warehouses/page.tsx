import { useEffect, useState } from 'react';
import api from '../../api/api';
import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import { IWarehouse } from '../../Interfaces/IWarehouse';
import VirtuosoTable, { ColumnData } from '../../Components/DataTable/DataTable';
import UpdateWarehouseDialog from '../../Components/PopUps/WarehousePopUps/UpdateWarehousePopUp';
import DeleteWarehouseDialog from '../../Components/PopUps/WarehousePopUps/DeleteWarehousePopUp';
import CreateWarehouseDialog from '../../Components/PopUps/WarehousePopUps/CreateWarehousePopUp';
import DefaultCard from '../../Components/Cards/Card';
import { Grid } from '@mui/material';

const warehouseColumns: ColumnData<IWarehouse>[] = [
  { dataKey: 'id', label: 'id', width: 50 },
  { dataKey: 'name', label: 'Name', width: 150 },
  { dataKey: 'location', label: 'Location', width: 150 },
];

function useWindowHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
}

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const height = useWindowHeight();

 useEffect(() => {
  const fetchWarehouses = async () => {
    try {
      const response = await api.Warehouses.getWarehouses();
      setWarehouses(response.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };
  fetchWarehouses();
}, []);

  const handleUpdate = (updated: IWarehouse) => {
    setWarehouses(prev =>
      prev.map(w => (w.id === updated.id ? { ...w, ...updated } : w))
    );
  };
  const handleDelete = (deletedId: number)  => {
      setWarehouses(prev => prev.filter(warehouse => warehouse.id !== deletedId));
    };
  
    const handleCreate = (created: IWarehouse) => {
      setWarehouses(prev => [...prev, created]);
    };

  return (
    <div className="App">
      <header className="App-header">
        <PillNavFull />
         <VirtuosoTable
          data={warehouses}
          columns={warehouseColumns}
          height={height * 0.85}
          onUpdate={handleUpdate}
          updateButton={(row) => (
            <UpdateWarehouseDialog
              id={row.id}
              text="Update"
              dialogTitle="Warehouse update"
              dialogContent={`Update the ${row.name} warehouse`}
              acceptText="Update"
              cancelText="Cancel"
              initialValues={row}
              onUpdate={handleUpdate}
            />
          )}
          deleteButton={(row) => (
          <DeleteWarehouseDialog
            id={row.id}
            text="Delete"
            dialogTitle="Delete warehouse"
            dialogContent={`Are you sure you want to delete ${row.name} warehouse?`}
            acceptText="Delete"
            cancelText="Cancel"
            onUpdate={handleDelete}
          />)}
          createButton={(
            <CreateWarehouseDialog
            text="Create"
            dialogTitle="Create warehouse"
            dialogContent={`Please add a name and a location`}
            acceptText="Create"
            cancelText="Cancel"
            onUpdate={handleCreate}
            />
          )} 
        /> 
        
      </header>
    </div>
  );
}


//Card layout if design changes
{/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
          <Grid container spacing={1} columns={7} >
              <DefaultCard<IWarehouse>
              name="New Warehouse"
              description="Create a new warehouse"
              createButton={
                <CreateWarehouseDialog
                  text="Create"
                  dialogTitle="Create warehouse"
                  dialogContent="Please add a name and location"
                  acceptText="Create"
                  cancelText="Cancel"
                  onUpdate={handleUpdate}
                />
              }
            />
              {warehouses.map((warehouse) => (
                <DefaultCard<IWarehouse>
                  key={warehouse.id}
                  data={warehouse}
                  name={warehouse.name}
                  description={warehouse.location}
                  updateButton={(row) => (
                    <UpdateWarehouseDialog
                      id={row.id}
                      text="Update"
                      dialogTitle="Warehouse update"
                      dialogContent={`Update the ${row.name} warehouse`}
                      acceptText="Update"
                      cancelText="Cancel"
                      initialValues={row}
                      onUpdate={handleUpdate}
                    />
                  )}
                  deleteButton={(row) => (
                    <DeleteWarehouseDialog
                      id={row.id}
                      text="Delete"
                      dialogTitle="Delete warehouse"
                      dialogContent={`Are you sure you want to delete ${row.name}?`}
                      acceptText="Delete"
                      cancelText="Cancel"
                      onUpdate={handleUpdate}
                    />
                  )}
                />
              
              ))} 
            
            </Grid> 
          </div>*/}