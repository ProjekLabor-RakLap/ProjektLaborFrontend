import { useEffect, useState } from 'react';
import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import { IProduct } from '../../Interfaces/IProduct';
import VirtuosoTable, { ColumnData } from '../../Components/DataTable/DataTable';
import { CreateProductDialogButton } from '../../Components/PopUps/ProductPopUps/CreateProductPopUp';
import UpdateProductDialog from '../../Components/PopUps/ProductPopUps/UpdateProductPopUp';
import DeleteProductDialog from '../../Components/PopUps/ProductPopUps/DeleteProductPopUp';
import api from '../../api/api';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import SimpleSnackbar from '../../Components/Snackbar/Snackbar';

const productColumns: ColumnData<IProduct>[] = [
  { dataKey: 'id', label: 'id', width: 50 },
  { dataKey: 'name', label: 'Name', width: 150 },
  { dataKey: 'ean', label: 'EAN', width: 150 },
  { dataKey: 'description', label: 'Desctiption', width: 150 },
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

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const height = useWindowHeight();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.Products.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleUpdate = (updated: IProduct) => {
    setProducts(prev =>
      prev.map(p => (p.id === updated.id ? { ...p, ...updated } : p))
    );
  };

  const handleDelete = (deletedId: number) => {
    setProducts(prev => prev.filter(product => product.id !== deletedId));
  };

  const handleCreate = (created: IProduct) => {
    setProducts(prev => [...prev, created]);
  };
  

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  
  // 2. Create the handler to show the snackbar
  const handleNotify = (message: string, severity: 'success' | 'error') => {
    setSnackbarState({ open: true, message, severity });
  };

  // 3. Create the handler to close the snackbar
  const handleSnackbarClose = () => {
    setSnackbarState((prev) => ({ ...prev, open: false }));
  };


  return (
    <div className="App">
      <header className="App-header">
        <PillNavFull />
        {loading ? 
        <Box sx={{ width: '100%' }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation="pulse" />
          <Skeleton animation={false} />
          <br/>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation="pulse" />
          <Skeleton animation={false} />
          <br/>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation="pulse" />
          <Skeleton animation={false} />
          <br/>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation="pulse" />
          <Skeleton animation={false} />
          
        </Box> :
        <VirtuosoTable
          data={products}
          columns={productColumns}
          height={height * 0.85}
          onUpdate={handleUpdate}
          updateButton={(row) => (
            <UpdateProductDialog
              id={row.id}
              text="Update"
              dialogTitle="Product update"
              dialogContent={`Update the ${row.name} product`}
              acceptText="Update"
              cancelText="Cancel"
              initialValues={row}
              onUpdate={handleUpdate}

            />
          )}
          deleteButton={(row) => (
          <DeleteProductDialog
            id={row.id}
            text="Delete"
            dialogTitle="Delete product"
            dialogContent={`Are you sure you want to delete ${row.name} product?`}
            acceptText="Delete"
            cancelText="Cancel"
            onUpdate={handleDelete}
            onNotify={handleNotify}
          />)}
          createButton={(
            <CreateProductDialogButton
              text="Create"
              dialogTitle="Create product"
              dialogContent={`Please add a name and a location`}
              acceptText="Create"
              cancelText="Cancel"
              onUpdate={handleCreate}
            />
          )} 
        />}
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
