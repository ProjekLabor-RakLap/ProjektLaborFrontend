import { useEffect, useState } from 'react';
import * as React from 'react';
import api from '../../api/api';
import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import { IWarehouse } from '../../Interfaces/IWarehouse';
import { IStock, IStockForTable } from '../../Interfaces/IStock';
import VirtuosoTable, { ColumnData } from '../../Components/DataTable/DataTable';
import SimpleSnackbar from '../../Components/Snackbar/Snackbar';
import SelectWarehouse from '../../Components/Inputs/Select/SelectWarehouse';
import CreateStockDialog from '../../Components/PopUps/StockPopUps/CreateStockPopUp';
import UpdateStockDialog from '../../Components/PopUps/StockPopUps/UpdateStockPopUp';
import DeleteStockDialog from '../../Components/PopUps/StockPopUps/DeleteStockPopUp';
import { IProduct } from '../../Interfaces/IProduct';

const stockColoums: ColumnData<IStockForTable>[] = [
  { dataKey: 'id', label: 'id', width: 50 },
  { dataKey: 'productName', label: 'Name', width: 150 },
  { dataKey: 'stock_capInWarehouse', label: 'Warehouse stock', width: 150 },
  { dataKey: 'stock_capkInStore', label: 'Store stock', width: 150 },
  { dataKey: 'price_curr', label: 'Price', width: 150 },
  { dataKey: 'warehouse_name_loc', label: 'Warehouse', width: 150 },
  { dataKey: 'image', label: 'Image', width: 150 },
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

export default function Stock() {
  const [stocks, setStocks] = useState<IStockForTable[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const height = useWindowHeight();
  const [selectedWarehouseId, setSelectedWarehouseId] = React.useState<number>(0);

  // --- Fetch warehouses ---
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

  // --- Fetch products ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.Products.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // --- Fetch stocks ---
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = selectedWarehouseId === 0
          ? await api.Stocks.getStocks()
          : await api.Stocks.getStockByWarehouse(selectedWarehouseId);

        const stocksArray = Array.isArray(response.data) ? response.data : [response.data];
        console.log("Fetched stocks:", stocksArray);
        const fetchedStocks: IStockForTable[] = stocksArray.map((stock: IStock) => ({
          id: stock.id,
          stock_capInWarehouse: `${stock.stockInWarehouse}/${stock.warehouseCapacity}`,
          stock_capkInStore: `${stock.stockInStore}/${stock.storeCapacity}`,
          price_curr: `${stock.price} ${stock.currency}`,
          warehouse_name_loc: `${stock.warehouse.name} - ${stock.warehouse.location}`,
          productName: stock.product.name,
          image: stock.product.image,
          transportCost: stock.transportCost,
          storageCost: stock.storageCost,
          whenToNotify: stock.whenToNotify,
          whenToWarn: stock.whenToWarn,
        }));

        setStocks(fetchedStocks);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, [selectedWarehouseId]);

  // --- CRUD handlers ---
  const handleUpdate = (updated: IStock) => {
    const newUpdated: IStockForTable = {
      id: updated.id,
      stock_capInWarehouse: `${updated.stockInWarehouse}/${updated.warehouseCapacity}`,
      stock_capkInStore: `${updated.stockInStore}/${updated.storeCapacity}`,
      price_curr: `${updated.price} ${updated.currency}`,
      warehouse_name_loc: `${updated.warehouse.name} - ${updated.warehouse.location}`,
      productName: updated.product.name,
      image: updated.product.image,
      transportCost: updated.transportCost,
      storageCost: updated.storageCost,
      whenToNotify: updated.whenToNotify,
      whenToWarn: updated.whenToWarn,
    };
    setStocks(prev => prev.map(w => (w.id === newUpdated.id ? { ...w, ...newUpdated } : w)));
  };

  const handleDelete = (deletedId: number) => {
    setStocks(prev => prev.filter(stock => stock.id !== deletedId));
  };

  const handleCreate = (created: IStock) => {
    const newCreated: IStockForTable = {
      id: created.id,
      stock_capInWarehouse: `${created.stockInWarehouse}/${created.warehouseCapacity}`,
      stock_capkInStore: `${created.stockInStore}/${created.storeCapacity}`,
      price_curr: `${created.price} ${created.currency}`,
      warehouse_name_loc: `${created.warehouse.name} - ${created.warehouse.location}`,
      productName: created.product.name,
      image: created.product.image,
      transportCost: created.transportCost,
      storageCost: created.storageCost,
      whenToNotify: created.whenToNotify,
      whenToWarn: created.whenToWarn,
    }; 
    setStocks(prev => [...prev, newCreated]);
  };

  const handleWarehouseChange = (id: number) => {
    setSelectedWarehouseId(id);
  };

  // --- Snackbar ---
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleNotify = (message: string, severity: 'success' | 'error') => {
    setSnackbarState({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbarState(prev => ({ ...prev, open: false }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <PillNavFull />

        <SelectWarehouse
          warehouses={warehouses}
          onWarehouseChange={handleWarehouseChange}
          />

          {warehouses.length > 0 && products.length > 0 && (
          <VirtuosoTable
            data={stocks}
            columns={stockColoums}
            height={height * 0.85}
            updateButton={(row) => {
              const foundWarehouse = warehouses.find(
                w => `${w.name} - ${w.location}` === row.warehouse_name_loc
              ) ?? { id: 0, name: "Unknown", location: "" };
              const foundProduct = products.find(p => p.name === row.productName) ?? {
                id: 0,
                name: "Unknown",
                image: "",
                ean: "",
                description: "",
              };
          return (
                <UpdateStockDialog
                  id={row.id}
                  text="Update"
                  dialogTitle="Update stock"
                  dialogContent={`Update the ${row.productName} stock`}
                  acceptText="Update"
                  cancelText="Cancel"
                  initialValues={{
                    id: row.id,
                    stockInWarehouse: parseInt(row.stock_capInWarehouse.split('/')[0]),
                    stockInStore: parseInt(row.stock_capkInStore.split('/')[0]),
                    warehouseCapacity: parseInt(row.stock_capInWarehouse.split('/')[1]),
                    storeCapacity: parseInt(row.stock_capkInStore.split('/')[1]),
                    price: parseFloat(row.price_curr.split(' ')[0]),
                    currency: row.price_curr.split(' ')[1],
                    transportCost: row.transportCost || 0,
                    storageCost: row.storageCost || 0,
                    whenToNotify: row.whenToNotify || 0,
                    whenToWarn: row.whenToWarn || 0,
                    warehouse: foundWarehouse,
                    product: foundProduct,
                  }}
                  warehouses={warehouses}
                  products={products}
                  onUpdate={handleUpdate}
                />
              );
            }}
            deleteButton={(row) => (
              <DeleteStockDialog
                id={row.id}
                text="Delete"
                dialogTitle="Delete stock"
                dialogContent={`Are you sure you want to delete ${row.productName} stock?`}
                acceptText="Delete"
                cancelText="Cancel"
                onUpdate={handleDelete}
                onNotify={handleNotify}
              />
            )}
            createButton={(
              <CreateStockDialog
                text="Create"
                dialogTitle="Create stock"
                dialogContent={`Please add a name and a location`}
                acceptText="Create"
                cancelText="Cancel"
                onUpdate={handleCreate}
                warehouses={warehouses}
                products={products}
              />
            )}
          />
        )}

        <SimpleSnackbar
          open={snackbarState.open}
          message={snackbarState.message}
          severity={snackbarState.severity}
          onClose={handleSnackbarClose}
        />
      </header>
    </div>
  );
}
