export interface IUserGet {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    warehouseIds: number[];
}

export interface IUserRegister {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roleId: number;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserPatch {
    firstname?: string;
    lastname?: string;
    email?: string;
    isVerified?: boolean;
}

export interface IUserForgotPwd {
    email: string;
    token: string;
    password: string;
}

export interface IUserChangePwd {
    email: string;
    Password: string;
    NewPassword: string;
}

export interface IUserAssignWarehouse {
    userId: number;
    warehuseId: number;
}