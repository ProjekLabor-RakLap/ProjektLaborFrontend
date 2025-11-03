import React, { useEffect } from 'react';
import '../../App.css';
import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import Select from '@mui/material/Select';
import { IWarehouse } from '../../Interfaces/IWarehouse';
import {IProduct} from '../../Interfaces/IProduct';
import {IStockChange} from '../../Interfaces/IStockChange';
import { IStock } from '../../Interfaces/IStock';
import MenuItem from '@mui/material/MenuItem';
import { LineChart } from '@mui/x-charts/LineChart';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BarChart, PieChart, SparkLineChart } from '@mui/x-charts';
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import api from '../../api/api';

function Statistics() {
  const [warehouses, setWarehouses] = React.useState<IWarehouse[]>([]);
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [mostsold, setMostsold] = React.useState<IProduct>();
  const [stuckProducts, setStuckProducts] = React.useState<IProduct[]>([]);
  const [productsSold, setProductsSold] = React.useState<{[productName: string] : number}>();
  const [stockChanges, setStockChanges] = React.useState<IStockChange[]>([]);
  const [weeklyData, setWeeklyData] = React.useState<IStockChange[]>([]);
  const [stock, setStock] = React.useState<IStock>();
  const [selectedWarehouse, setSelectedWarehouse] = React.useState<number | null>();
  const [selectedProduct, setSelectedProduct] = React.useState<number | null>();
  const [loadingWarehouses, setLoadingWarehouses] = React.useState(true);
  const [loadingProducts, setLoadingProducts] = React.useState(false);
  const [loadingStockChanges, setLoadingStockChanges] = React.useState(false);
  const [loadingStock, setLoadingStock] = React.useState(false);
  const [loadingWeeklyData, setLoadingWeeklyData] = React.useState(false);

  const getSelectedWarehouseName = () => {
    if (!selectedWarehouse) return '';
    const warehouse = warehouses.find(w => w.id === selectedWarehouse);
    return warehouse ? warehouse.name : '';
  };

  const getSelectedProductName = () => {
    if (!selectedProduct) return '';
    const product = products.find(p => p.id === selectedProduct);
    return product ? product.name : '';
  };

  useEffect(() => {
    const fetchWarehouses = async () => {
      setLoadingWarehouses(true);
      try {
        const response = await api.Warehouses.getWarehouses();
        const data = await response.data;
        setWarehouses(data);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      } finally {
        setLoadingWarehouses(false);
      }
    };

    fetchWarehouses();
  }, []);

  const handleChangeWarehouse = (event: any) => {
    setSelectedWarehouse(event.target.value);
    setSelectedProduct(null);
    setProducts([]);
    setStockChanges([]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedWarehouse) return;
      setLoadingProducts(true);
      try {
        const response = await api.Products.getProductsByWarehouse(selectedWarehouse);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [selectedWarehouse]);

  useEffect(() => {
    const mostsold = async () => {
      if (!selectedWarehouse) return;
      setLoadingProducts(true);
      try {
        const response = await api.Products.mostSold(selectedWarehouse)
        const data = await response.data;
        setMostsold(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    mostsold();
  }, [selectedWarehouse]);

  useEffect(() => {
    const stuckproducts = async () => {
      if (!selectedWarehouse) return;
      setLoadingProducts(true);
      try {
        const response = await api.Products.stuckProducts(selectedWarehouse);
        const data = await response.data;
        setStuckProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    stuckproducts();
  }, [selectedWarehouse]);

  useEffect(() => {
    const productsSold = async () => {
      if (!selectedWarehouse) return;
      setLoadingProducts(true);
      try {
        const response = await api.Warehouses.productsSold(selectedWarehouse);
        const data = await response.data;
        setProductsSold(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    productsSold();
  }, [selectedWarehouse]);

  const handleChangeProduct = (event: any) => {
    setSelectedProduct(event.target.value);
  };

  useEffect(() => {
    const fetchWeeklyData = async () => {
      if (!selectedWarehouse) return;
      setLoadingWeeklyData(true);
      try {
        const response = await api.StockChanges.weeklyData(selectedWarehouse);
        const data = await response.data;
        setWeeklyData(data);
      } catch (error) {
        console.error('Error fetching weekly data:', error);
      } finally {
        setLoadingWeeklyData(false);
      }
    };

    fetchWeeklyData();
  }, [selectedWarehouse]);

  useEffect(() => {
    const fetchStockChanges = async () => {
      if (!selectedWarehouse || !selectedProduct) return;
      setLoadingStockChanges(true);

      try {
        const response = await api.StockChanges.warehouseProduct(selectedProduct, selectedWarehouse);
        const data = await response.data;
        setStockChanges(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching stock changes:', error);
      }finally {
        setLoadingStockChanges(false);
      }
    };

    fetchStockChanges();
  }, [selectedWarehouse, selectedProduct]);

  useEffect(() => {
    const fetchStock = async () => {
      if (!selectedWarehouse || !selectedProduct) return;
      setLoadingStock(true);
      try {
        const response = await api.Stocks.productStock(selectedProduct);
        const data = await response.data;
        setStock(data);
      } catch (error) {
        console.error('Error fetching stock:', error);
      } finally {
        setLoadingStock(false);
      }
    };
    fetchStock();
  }, [selectedWarehouse, selectedProduct]);

  const chartData = stockChanges
    .sort(
      (a, b) => new Date(a.changeDate).getTime() - new Date(b.changeDate).getTime()
    )
    .map((item) => ({
      date: new Date(item.changeDate),
      quantity: item.quantity,
    }));

    const weeklySalesData = React.useMemo(() => {
    if (!weeklyData.length) return null;

    const dailySales = weeklyData.reduce((acc, item) => {
      const date = new Date(item.changeDate);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (!acc[dayKey]) {
        acc[dayKey] = {
          day: dayKey,
          sales: 0,
          date: date
        };
      }
      
      acc[dayKey].sales += Math.abs(item.quantity);
      
      return acc;
    }, {} as Record<string, { day: string; sales: number; date: Date }>);

    return Object.values(dailySales)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map(item => item.sales);
  }, [weeklyData]);

  const dayLabels = React.useMemo(() => {
    if (!weeklyData.length) return [];
    
    const dailySales = weeklyData.reduce((acc, item) => {
      const date = new Date(item.changeDate);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (!acc[dayKey]) {
        acc[dayKey] = date;
      }
      return acc;
    }, {} as Record<string, Date>);

    return Object.entries(dailySales)
      .sort((a, b) => a[1].getTime() - b[1].getTime())
      .map(([day]) => day);
  }, [weeklyData]);

  const totalWeeklySales = React.useMemo(() => {
    if (!weeklyData.length) return 0;
    return weeklyData.reduce((total, item) => total + Math.abs(item.quantity), 0);
  }, [weeklyData]);

  const dataset = productsSold ? Object.entries(productsSold).map(([productName, sold]) => ({
    product: productName,
    sold: sold,
  })) : [];

  const valueFormatter = (value: number | null) => `${value ?? 0} pcs`;

  const layout = dataset.length < 6 ? "vertical" : "horizontal";

  return (
    <div className="App">
      <header className="App-header">
        <PillNavFull />

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <InputLabel
          variant="standard"
          htmlFor="warehouse-select"
          sx={{ color: 'white', mb: 1, marginTop: 10 }}
        >
          Warehouse
        </InputLabel>
        

        {loadingWarehouses ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        ) : (
          <Select
            value={selectedWarehouse}
            onChange={handleChangeWarehouse}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: '#888' }}>Select a warehouse</span>;
              }
              return getSelectedWarehouseName();
            }}
            sx={{
              width: 300,
              bgcolor: 'white',
              color: 'black',
              borderRadius: 1,
              marginBottom: '20px',
            }}
            inputProps={{ id: 'warehouse-select' }}
          >
            {warehouses.map((warehouse) => (
              <MenuItem key={warehouse.name} value={warehouse.id}>
                {warehouse.name}
              </MenuItem>
            ))}
          </Select>
        )}
        </div>

        <br />

        {selectedWarehouse && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputLabel
              variant="standard"
              htmlFor="product-select"
              sx={{ color: 'white', mb: 1 }}
            >
              Product
            </InputLabel>

            {loadingProducts ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress sx={{ color: 'white' }} />
              </Box>
            ) : (
              <Select
                value={selectedProduct}
                onChange={handleChangeProduct}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: '#888' }}>Select a product</span>;
                  }
                  return getSelectedProductName();
                }}
                sx={{
                  width: 300,
                  bgcolor: 'white',
                  color: 'black',
                  borderRadius: 1,
                  marginBottom: '20px',
                }}
                inputProps={{ id: 'product-select' }}
              >
                {products.map((product) => (
                  <MenuItem key={product.name} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </div>
        )}
        </div>

        {selectedWarehouse && (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      gap: "50px",
      marginBottom: "50px",
      flexWrap: "wrap",
    }}
  >
    {[
      {
        label: "Previous Week Sales",
        color: "primary",
        content: (
          <CardContent sx={{ flexGrow: 1 }}>
            {loadingWeeklyData ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            ) : weeklySalesData && weeklySalesData.length > 0 ? (
              <>
                <SparkLineChart
                  data={weeklySalesData}
                  height={150}
                  area
                  showTooltip
                  showHighlight
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  {dayLabels.map((day) => (
                    <Typography key={day} variant="caption" align="center">
                      {day}
                    </Typography>
                  ))}
                </Box>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Total Sales: <strong>{totalWeeklySales}</strong> units
                </Typography>
                <Typography variant="caption" display="block" align="center" color="text.secondary">
                  {weeklyData.length} sales transactions
                </Typography>
              </>
            ) : (
              <Typography variant="body2" align="center" color="text.secondary" sx={{ py: 4 }}>
                No sales data available for previous week
              </Typography>
            )}
          </CardContent>
        ),
      },
      {
        label: "Most Sold Product",
        color: "primary",
        content: (
          <CardActionArea sx={{ flexGrow: 1 }}>
            <CardMedia
              component="img"
              image={`data:image/png;base64,${mostsold?.image ?? ""}`}
              alt={mostsold?.name}
              sx={{
                height: 200,
                objectFit: "contain",
                bgcolor: "background.paper",
                p: 1,
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {mostsold?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {mostsold?.description || "No description available."}
              </Typography>
              <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                EAN: {mostsold?.ean}
              </Typography>
            </CardContent>
          </CardActionArea>
        ),
      },
      {
        label: "Products Overall Sold",
        color: "primary",
        content: (
          <CardActionArea sx={{ flexGrow: 1 }}>
          <CardContent sx={{ flexGrow: 1, overflow: 'auto' }}>
            <Box sx={{ minHeight: 350, width: '100%' }}>
              {layout === "horizontal" ? (
                <BarChart 
                  dataset={dataset} 
                  yAxis={[{ scaleType: 'band', dataKey: 'product' }]} 
                  series={[{ dataKey: 'sold', label: 'Products Sold', valueFormatter }]} 
                  layout={"horizontal"} 
                  width={undefined} 
                  height={undefined} 
                  sx={{ width: '100%', height: '100%' }} 
                />
              ) : (
                <BarChart 
                  dataset={dataset} 
                  xAxis={[{ scaleType: 'band', dataKey: 'product' }]} 
                  series={[{ dataKey: 'sold', label: 'Products Sold', valueFormatter }]} 
                  layout={"vertical"} 
                  width={undefined} 
                  height={undefined} 
                  sx={{ width: '100%', height: '100%' }} 
                />
              )}
            </Box>
          </CardContent>
        </CardActionArea>
        ),
      },
      {
        label: "Unpopular Products",
        color: "error",
        content: (
          <List
            sx={{
              flexGrow: 1,
              overflow: "auto",
              maxHeight: "100%",
            }}
            subheader={
              <ListSubheader
                sx={{
                  bgcolor: "background.paper",
                  fontWeight: "bold",
                  color: "error.main",
                  textAlign: "center",
                }}
              >
                Unpopular Products
              </ListSubheader>
            }
          >
            {stuckProducts && stuckProducts.length > 0 ? (
              stuckProducts.map((product) => (
                <React.Fragment key={product.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "error.main" }}>
                        <InventoryIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                          {product.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            EAN: {product.ean}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.description || "No description available"}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary="No stuck products found"
                  sx={{ textAlign: "center", color: "text.secondary" }}
                />
              </ListItem>
            )}
          </List>
        ),
      },
    ].map(({ label, color, content }) => (
      <Box
        key={label}
        sx={{
          flex: 1,
          minWidth: 350,
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Chip label={label} color={color as "primary" | "error"} sx={{ mb: 1, fontWeight: "bold" }} />
        <Card
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 450,
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          {content}
        </Card>
      </Box>
    ))}
  </Box>
)}


        {selectedProduct && (
          <>
            {loadingStockChanges || loadingStock ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress sx={{ color: 'white' }} />
              </Box>
            ) : chartData.length > 0 ? (
              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="flex-start"
                sx={{ mt: 3 }}
              >
                <Grid>
                  <div
                    style={{
                      width: '600px',
                      height: '400px',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '10px',
                    }}
                  >
                    <LineChart
                      xAxis={[
                        {
                          data: chartData.map((d) => d.date),
                          scaleType: 'time',
                          label: 'Date',
                          valueFormatter: (value) =>
                            new Date(value).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                            }),
                        },
                      ]}
                      series={[
                        {
                          data: chartData.map((d) => d.quantity),
                          label: 'Stock Change',
                          showMark: true,
                          color: '#1976d2',
                        },
                      ]}
                      yAxis={[{ label: 'Quantity Change' }]}
                      grid={{ vertical: true, horizontal: true }}
                    />
                  </div>
                </Grid>
                {stock && (
                  <>
                  <Card sx={{ maxWidth: 400, mx: 'auto', my: 3, bgcolor: 'background.paper' }}>
                  <CardContent>
                    <Grid>
                      <PieChart
                        colors={['green', 'blue', 'red']}
                        series={[
                          {
                            data: [
                              {
                                id: 0,
                                value: stock.stockInWarehouse,
                                label: 'In Warehouse',
                              },
                              {
                                id: 1,
                                value:
                                  stock.warehouseCapacity - stock.stockInWarehouse,
                                label: 'Free Space',
                              },
                            ],
                          },
                        ]}
                        
                        width={250}
                        height={250}
                      />
                      <p style={{ color: 'black' }}>Warehouse Capacity</p>
                    </Grid>
                    </CardContent>
                    </Card>
                    
                    <Card sx={{ maxWidth: 400, mx: 'auto', my: 3, bgcolor: 'background.paper' }}>
                    <CardContent>
                    <Grid>
                      <PieChart
                        colors={['green', 'blue']}
                        series={[
                          {
                            data: [
                              {
                                id: 0,
                                value: stock.stockInStore,
                                label: 'In Store',
                              },
                              {
                                id: 1,
                                value: stock.storeCapacity - stock.stockInStore,
                                label: 'Free Space',
                              },
                            ],
                          },
                        ]}
                        width={250}
                        height={250}
                      />
                      <p style={{ color: 'black' }}>Store Capacity</p>
                    </Grid>
                    </CardContent>
                    </Card>
                  </>
                )}
              </Grid>
            ) : (
              <p>No stock changes available.</p>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default Statistics;
