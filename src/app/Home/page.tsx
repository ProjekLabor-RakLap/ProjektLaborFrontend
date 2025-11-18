import React, { useEffect, useState } from 'react';
import logo from '../../sakurachiyonoo_03.png';
import '../../App.css';
import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import MagicBento from '../../Components/MagicBento/MagicBento';
import CreateStockDialog from '../../Components/PopUps/StockPopUps/CreateStockPopUp';
import api from '../../api/api';
import { IProduct } from '../../Interfaces/IProduct';
import { IWarehouse } from '../../Interfaces/IWarehouse';

function Home() {
  
  const [products, setProducts] = useState<IProduct[]>([]);
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
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
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
  console.log("Products:", products);
  console.log("Warehouses:", warehouses);
  return (
    <div className="App">
      <header className="App-header">
        <PillNavFull/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <div>
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
        <CreateStockDialog
          acceptText='Create'
          cancelText='Cancel'
          dialogContent='Create a new stock item'
          dialogTitle='Create Stock'
          text='Create Stock'
          warehouses={warehouses}
          products={products}
        />
      </header>
    </div>
  );
}

export default Home;
