export interface IUser {
    id : number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    isverified: boolean;
    warehouseNames: string[];
}

export interface IAssignWarehouse{
    userId: number;
    warehouseId: number;
}