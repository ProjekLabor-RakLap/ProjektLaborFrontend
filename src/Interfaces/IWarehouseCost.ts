import {IProduct} from "./IProduct"
import {IStock} from "./IStock"
import {IStockChange} from "./IStockChange"

export interface IWarehouseCost{
    productStockChanges: IProductStockChanges[]
}

export interface IProductStockChanges{
    product: IProduct,
    stock: IStock,
    stockChanges: IStockChange[]
}

