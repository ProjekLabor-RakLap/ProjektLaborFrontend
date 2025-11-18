import { IProduct } from "./IProduct";
import { IWarehouse } from "./IWarehouse";

export interface IStock {
    id : number;
    stockInWarehouse: number;
    stockInStore: number;
    warehouseCapacity: number;
    storeCapacity: number;
    price: number;
    currency: string;
    transportCost?: number;
    storageCost?: number;
    whenToNotify?: number;
    whenToWarn?: number;
    warehouse: IWarehouse;
    product: IProduct;
}

export interface IStockWithId {
    id : number;
    stockInWarehouse: number;
    stockInStore: number;
    warehouseCapacity: number;
    storeCapacity: number;
    price: number;
    currency: string;
    transportCost?: number;
    storageCost?: number;
    whenToNotify?: number;
    whenToWarn?: number;
    warehouse: IWarehouse;
    product: IProduct;
}

export interface IStockForTable {
    id : number;
    stock_capInWarehouse: string;
    stock_capkInStore: string;
    price_curr: string;
    warehouse_name_loc: String;
    productName: string;
    image: string | null;
    transportCost?: number;
    storageCost?: number;
    whenToNotify?: number;
    whenToWarn?: number;
}

export interface ICreateStock{
    stockInWarehouse: number;
    stockInStore: number;
    warehouseCapacity: number;
    storeCapacity: number;
    productId: number;
    currency: string;
    price: number;
    warehouseId: number;
    transportCost?: number;
    storageCost?: number;
    whenToNotify?: number;
    whenToWarn?: number;
}

export interface IUpdateStock{
    stockInWarehouse?: number | null;
    stockInStore?: number | null;
    warehouseCapacity?: number | null;
    storeCapacity?: number | null;
    productId?: number | null;
    currency?: string | null;
    price?: number | null;
    warehouseId?: number | null;
    transportCost?: number;
    storageCost?: number;
    whenToNotify?: number;
    whenToWarn?: number;
}