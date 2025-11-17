import { IProduct, ICreateProduct, IUpdateProduct } from "../Interfaces/IProduct";
import { IWarehouse, ICreateWarehouse, IUpdateWarehouse } from "../Interfaces/IWarehouse";
import { IStock, ICreateStock, IUpdateStock } from "../Interfaces/IStock";
import { IStockChange, ICreateStockChange, IUpdateStockChange } from "../Interfaces/IStockChange";
import { IUserGet, IUserAssignWarehouse, IUserChangePwd, IUserForgotPwd, IUserLogin, IUserPatch, IUserRegister } from "../Interfaces/IUser";
import { IWarehouseCost } from "../Interfaces/IWarehouseCost";
import axiosInstance from "./axois.config";
import { IWarehouseStorageCost } from "Interfaces/IWarehouseStorageCost";
import { send } from "process";

const Products = {
    getProducts: () => axiosInstance.get<IProduct[]>(`/api/product`),
    getProduct: (id: number) => axiosInstance.get<IProduct>(`/api/product/${id}`),
    deleteProduct: (id: number) => axiosInstance.delete<void>(`/api/product/${id}`),
    createProduct: (param: ICreateProduct) => axiosInstance.post<IProduct>(`/api/product`, param),
    updateProduct: (id: number, param2 : IUpdateProduct) => axiosInstance.patch<IProduct>(`/api/product/${id}`, param2),
    mostSold: (warehouseId: number) => axiosInstance.get<IProduct>(`/api/product/mostsold/${warehouseId}`),
    stuckProducts: (warehouseId: number) => axiosInstance.get<IProduct[]>(`/api/product/stuckproducts/${warehouseId}`),
    getProductsByWarehouse: (warehouseId: number) => axiosInstance.get<IProduct[]>(`/api/product/warehouse/${warehouseId}`)
}

const Warehouses = {
    getWarehouses: () => axiosInstance.get<IWarehouse[]>(`/api/warehouse`),
    getWarehouse: (id: number) => axiosInstance.get<IWarehouse>(`/api/warehouse/${id}`),
    deleteWarehouse: (id: number) => axiosInstance.delete<IWarehouse>(`/api/warehouse/${id}`),
    createWarehouse: (param: ICreateWarehouse) => axiosInstance.post<IWarehouse>(`/api/warehouse`,param),
    updateWarehouse: (id: number, param2: IUpdateWarehouse) => axiosInstance.patch<IWarehouse>(`/api/warehouse/${id}`, param2),
    productsSold: (warehouseId: number) => axiosInstance.get<{[productName: string] : number}>(`/api/warehouse/productssold/${warehouseId}`)
} 

const Stocks = {
    getStocks: () => axiosInstance.get<IStock[]>(`/api/stock`),
    getStock: (id: number) => axiosInstance.get<IStock>(`/api/stock/${id}`),
    getStockByWarehouse: (id: number) => axiosInstance.get<IStock>(`/api/stock/get-stock-by-warehouse/${id}`),
    deleteStock: (id: number) => axiosInstance.delete<void>(`/api/stock/${id}`),
    createStock: (param: ICreateStock) => axiosInstance.post<ICreateStock>(`/api/stock`, param),
    updateStock:  (id: number, param2: IUpdateStock) => axiosInstance.patch<IUpdateStock>(`/api/stock/${id}`,param2),
    productStock: (productId: number) => axiosInstance.get<IStock>(`/api/stock/product/${productId}`),
    warehouseCost: (warehouseId: number) => axiosInstance.get<IWarehouseCost>(`/api/stock/warehousecost/${warehouseId}`),
    storageCost: (warehouseId: number) => axiosInstance.get<IWarehouseStorageCost>(`/api/stock/storagecost/${warehouseId}`)
}

const StockChanges = {
    getStockChanges: () => axiosInstance.get<IStockChange[]>(`/api/stockchange`),
    getStockChange: (id: number) => axiosInstance.get<IStockChange>(`/api/stockchange/${id}`),
    getStockChangeByWarehouse: (id: number) => axiosInstance.get<IStockChange>(`/api/stockchange/get-change-by-warehouse/${id}`),
    deleteStockChange: (id: number) => axiosInstance.delete<void>(`/api/stockchange/${id}`),
    createStockChange: (param: ICreateStockChange) => axiosInstance.post<ICreateStockChange>(`/api/stockchange`, param),
    updateStockChange:  (id: number, param2: IUpdateStockChange) => axiosInstance.patch<IUpdateStockChange>(`/api/stockchange/${id}`,param2),
    weeklyData: (warehouseId: number) => axiosInstance.get<IStockChange[]>(`/api/stockchange/previous-week/${warehouseId}`),
    warehouseProduct: (productId: number, warehouseId: number) => axiosInstance.get<IStockChange[]>(`/api/stockchange/warehouse-product/${productId}-${warehouseId}`),
    warehouse: (warehouseId: number) => axiosInstance.get<IStockChange[]>(`/api/stockchange/warehouse/${warehouseId}`)
}

const Users = {
    getUsers: () => axiosInstance.get<IUserGet[]>(`/api/user`),
    getUser: (id: number) => axiosInstance.get<IUserGet>(`/api/user/${id}`),
    deleteUser: (id: number) => axiosInstance.delete<void>(`/api/user/${id}`),
    registerUser: (param: IUserRegister) => axiosInstance.post<IUserGet>(`/api/user/register`, param),
    login: (param: IUserLogin) => axiosInstance.post<IUserGet>(`/api/user/login`, param),
    updateUser: (id: number, param: IUserPatch) => axiosInstance.patch<IUserGet>(`/api/user/update-profile/${id}`, param),
    resetPassword: (param: IUserForgotPwd) => axiosInstance.patch<void>(`/api/user/reset-password`, param),
    updatePassword: (param: IUserChangePwd) => axiosInstance.patch<void>(`/api/user/update-password`, param),
    assignUserWarehouse: (param: IUserAssignWarehouse) => axiosInstance.patch<void>(`/api/user/assign-user-warehouse`, param),
    unAssignUserWarehouse: (param: IUserAssignWarehouse) => axiosInstance.delete<void>(`/api/user/assign-user-warehouse`, {data: param}),
    sendVerificationCode: (email: string) => axiosInstance.post<void>(`/api/user/send-verification-code`, {email}),
    verifyAccount: (email: string, verificationCode: string) => axiosInstance.post<void>(`/api/user/verify-email`, {email, verificationCode}),
}

const api = {Products, Warehouses, Stocks, StockChanges, Users}

export default api;