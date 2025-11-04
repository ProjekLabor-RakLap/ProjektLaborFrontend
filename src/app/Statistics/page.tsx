import React from 'react';
import '../../App.css';
import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import WarehouseProductSelector from '../../Components/Selector/WarehouseProductSelector';
import WarehouseDashboard from '../../Components/Dashboard/WarehouseStatisticsDashboard';
import StockOverview from '../../Components/Dashboard/ProductStatisticsDashboard';
import { useWarehouseStatistics } from '../../Components/hooks/useWarehouseStatistics';

function Statistics() {
  const {
    warehouses,
    products,
    mostsold,
    stuckProducts,
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
    stock,
  } = useWarehouseStatistics();

  const getWarehouseName = () => {
  if (!selectedWarehouse) return '';
  const warehouse = warehouses.find(w => w.id === selectedWarehouse);
  return warehouse ? warehouse.name : '';
};

const getProductName = () => {
  if (!selectedProduct) return '';
  const product = products.find(p => p.id === selectedProduct);
  return product ? product.name : '';
};


  return (
    <div className="App">
      <div className="App-header">
        <PillNavFull />

        <WarehouseProductSelector
          warehouses={warehouses}
          products={products}
          selectedWarehouse={selectedWarehouse}
          selectedProduct={selectedProduct}
          loadingWarehouses={loadingWarehouses}
          loadingProducts={loadingProducts}
          onSelectWarehouse={(id) => {
            setSelectedWarehouse(id);
            setSelectedProduct(null);
          }}
          onSelectProduct={(id) => setSelectedProduct(id)}
          getWarehouseName={getWarehouseName}
          getProductName={getProductName}
        />

        <WarehouseDashboard
          selectedWarehouse={selectedWarehouse}
          loadingWeeklyData={loadingWeeklyData}
          weeklySalesData={weeklySalesData}
          dayLabels={dayLabels}
          totalWeeklySales={totalWeeklySales}
          weeklyData={[]}
          mostsold={mostsold}
          dataset={dataset}
          layout={layout}
          valueFormatter={valueFormatter}
          stuckProducts={stuckProducts}
        />

        <StockOverview
          selectedProduct={selectedProduct}
          loadingStockChanges={loadingStockChanges}
          loadingStock={loadingStock}
          chartData={chartData}
          stock={stock}
        />
      </div>
    </div>
  );
}

export default Statistics;