import { useState, useEffect, useMemo, useCallback } from 'react';
import { IWarehouse } from '../../Interfaces/IWarehouse';
import { IProduct } from '../../Interfaces/IProduct';
import { IStockChange } from '../../Interfaces/IStockChange';
import { IStock } from '../../Interfaces/IStock';
import api from '../../api/api';
import { IWarehouseCost } from 'Interfaces/IWarehouseCost';
import { IWarehouseStorageCost } from 'Interfaces/IWarehouseStorageCost';
import axiosInstance from 'api/axois.config';

export function useWarehouseStatistics() {
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [mostsold, setMostsold] = useState<IProduct>();
  const [stuckProducts, setStuckProducts] = useState<IProduct[]>([]);
  const [productsSold, setProductsSold] = useState<{ [productName: string]: number }>();
  const [stockChanges, setStockChanges] = useState<IStockChange[]>([]);
  const [stockChangesByWarehouse, setStockChangesByWarehouse] = useState<IStockChange[]>([]);
  const [weeklyData, setWeeklyData] = useState<IStockChange[]>([]);
  const [stock, setStock] = useState<IStock>();
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [WarehouseCost, setWarehouseCost] = useState<IWarehouseCost | null>();
  const [storageCost, setStorageCost] = useState<IWarehouseStorageCost | null>(null);

  const [loadingWarehouses, setLoadingWarehouses] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingStockChanges, setLoadingStockChanges] = useState(false);
  const [loadingStockChangesByWarehouse, setLoadingStockChangesByWarehouse] = useState(false);
  const [loadingStock, setLoadingStock] = useState(false);
  const [loadingWeeklyData, setLoadingWeeklyData] = useState(false);
  const [loadingWarehouseCost, setLoadingWarehouseCost] = useState(false);
  const [loadingStorageCost, setLoadingStorageCost] = useState(false);
  const [movingAverage, setMovingAverage] = useState<number | null>(null);
  const [loadingMovingAverage, setLoadingMovingAverage] = useState(false);
  const [movingAverageError, setMovingAverageError] = useState<string | null>(null);

   const fetchMovingAverage = useCallback(
    async (window: number = 3) => {
      if (!selectedProduct || !selectedWarehouse) return;

      setLoadingMovingAverage(true);
      setMovingAverageError(null);

      try {
        const response = await axiosInstance.get<string>(
          `/api/stockchange/calculate-moving-average/${selectedProduct}?warehouseId=${selectedWarehouse}&window=${window}`
        );
        const match = response.data.match(/: ([\d.]+)/);
        if (match) {
          setMovingAverage(parseFloat(match[1]));
        } else {
          setMovingAverage(null);
          setMovingAverageError('Unexpected server response');
        }
      } catch (err) {
        setMovingAverageError('Failed to fetch moving average');
        setMovingAverage(null);
        console.error(err);
      } finally {
        setLoadingMovingAverage(false);
      }
    },
    [selectedProduct, selectedWarehouse]
  );

  useEffect(() => {
    const fetchWarehouses = async () => {
      setLoadingWarehouses(true);
      try {
        const response = await api.Warehouses.getWarehouses();
        setWarehouses(response.data);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      } finally {
        setLoadingWarehouses(false);
      }
    };
    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (!selectedWarehouse) return;
    const fetchProducts = async () => {
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
    if (!selectedWarehouse) return;
    const fetchMostSold = async () => {
      setLoadingProducts(true);
      try {
        const response = await api.Products.mostSold(selectedWarehouse);
        setMostsold(response.data);
      } catch (error) {
        console.error('Error fetching most sold:', error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchMostSold();
  }, [selectedWarehouse]);

  useEffect(() => {
    if (!selectedWarehouse) return;
    const fetchStuckProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await api.Products.stuckProducts(selectedWarehouse);
        setStuckProducts(response.data);
      } catch (error) {
        console.error('Error fetching stuck products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchStuckProducts();
  }, [selectedWarehouse]);

  useEffect(() => {
    if (!selectedWarehouse) return;
    const fetchWarehouseCost = async () => {
      setLoadingWarehouseCost(true);
      try {
        const response = await api.Stocks.warehouseCost(selectedWarehouse);
        setWarehouseCost(response.data);
      } catch (error) {
        console.error('Error fetching stuck products:', error);
      } finally {
        setLoadingWarehouseCost(false);
      }
    };
    fetchWarehouseCost();
  }, [selectedWarehouse]);

  useEffect(() => {
    if (!selectedWarehouse) return;
    const fetchStorageCost = async () => {
      setLoadingStorageCost(true);
      try {
        const response = await api.Stocks.storageCost(selectedWarehouse);
        setStorageCost(response.data);
      } catch (error) {
        console.error('Error fetching stuck products:', error);
      } finally {
        setLoadingStorageCost(false);
      }
    };
    fetchStorageCost();
  }, [selectedWarehouse]);

  useEffect(() => {
    if (!selectedWarehouse) return;
    const fetchProductsSold = async () => {
      setLoadingProducts(true);
      try {
        const response = await api.Warehouses.productsSold(selectedWarehouse);
        setProductsSold(response.data);
      } catch (error) {
        console.error('Error fetching products sold:', error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProductsSold();
  }, [selectedWarehouse]);

  useEffect(() => {
    if (!selectedWarehouse) return;
    const fetchWeeklyData = async () => {
      setLoadingWeeklyData(true);
      try {
        const response = await api.StockChanges.weeklyData(selectedWarehouse);
        setWeeklyData(response.data);
      } catch (error) {
        console.error('Error fetching weekly data:', error);
      } finally {
        setLoadingWeeklyData(false);
      }
    };
    fetchWeeklyData();
  }, [selectedWarehouse]);

  useEffect(() => {
    if (!selectedWarehouse) return;
    const fetchStockChangesByWarehouse = async () => {
      setLoadingStockChangesByWarehouse(true);
      try {
        const response = await api.StockChanges.warehouse(selectedWarehouse);
        setStockChangesByWarehouse(response.data);
      } catch (error) {
        console.error('Error fetching weekly data:', error);
      } finally {
        setLoadingStockChangesByWarehouse(false);
      }
    };
    fetchStockChangesByWarehouse();
  }, [selectedWarehouse]);

  useEffect(() => {
    if (!selectedWarehouse || !selectedProduct) return;
    const fetchStockChanges = async () => {
      setLoadingStockChanges(true);
      try {
        const response = await api.StockChanges.warehouseProduct(selectedProduct, selectedWarehouse);
        setStockChanges(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching stock changes:', error);
      } finally {
        setLoadingStockChanges(false);
      }
    };
    fetchStockChanges();
  }, [selectedWarehouse, selectedProduct]);

  useEffect(() => {
    if (!selectedWarehouse || !selectedProduct) return;
    const fetchStock = async () => {
      setLoadingStock(true);
      try {
        const response = await api.Stocks.productStock(selectedProduct);
        setStock(response.data);
      } catch (error) {
        console.error('Error fetching stock:', error);
      } finally {
        setLoadingStock(false);
      }
    };
    fetchStock();
  }, [selectedWarehouse, selectedProduct]);

  const chartData = useMemo(() => {
    return stockChanges
      .sort((a, b) => new Date(a.changeDate).getTime() - new Date(b.changeDate).getTime())
      .map((item) => ({
        date: new Date(item.changeDate),
        quantity: item.quantity,
      }));
  }, [stockChanges]);

  const weeklySalesData = useMemo(() => {
    if (!weeklyData.length) return null;
    const dailySales = weeklyData.reduce((acc, item) => {
      const date = new Date(item.changeDate);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
      if (!acc[dayKey]) acc[dayKey] = { day: dayKey, sales: 0, date };
      acc[dayKey].sales += Math.abs(item.quantity);
      return acc;
    }, {} as Record<string, { day: string; sales: number; date: Date }>);
    return Object.values(dailySales)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((item) => item.sales);
  }, [weeklyData]);

  const dayLabels = useMemo(() => {
    if (!weeklyData.length) return [];
    const dailySales = weeklyData.reduce((acc, item) => {
      const date = new Date(item.changeDate);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
      if (!acc[dayKey]) acc[dayKey] = date;
      return acc;
    }, {} as Record<string, Date>);
    return Object.entries(dailySales)
      .sort((a, b) => a[1].getTime() - b[1].getTime())
      .map(([day]) => day);
  }, [weeklyData]);

  const totalWeeklySales = useMemo(() => {
    if (!weeklyData.length) return 0;
    return weeklyData.reduce((total, item) => total + Math.abs(item.quantity), 0);
  }, [weeklyData]);

  const dataset = productsSold
    ? Object.entries(productsSold).map(([productName, sold]) => ({
        product: productName,
        sold,
      }))
    : [];

  const valueFormatter = (value: number | null) => `${value ?? 0} pcs`;
  const layout = dataset.length < 6 ? 'vertical' : 'horizontal';

  return {
    warehouses,
    products,
    mostsold,
    stuckProducts,
    productsSold,
    stockChanges,
    weeklyData,
    stock,
    selectedWarehouse,
    selectedProduct,
    setSelectedWarehouse,
    setSelectedProduct,
    loadingWarehouses,
    loadingProducts,
    loadingStockChanges,
    loadingStock,
    loadingWeeklyData,
    chartData,
    weeklySalesData,
    dayLabels,
    totalWeeklySales,
    dataset,
    layout,
    valueFormatter,
    stockChangesByWarehouse,
    loadingStockChangesByWarehouse,
    WarehouseCost,
    loadingWarehouseCost,
    storageCost,
    loadingStorageCost,
    movingAverage,
    fetchMovingAverage,
    loadingMovingAverage,
    movingAverageError
  };
}