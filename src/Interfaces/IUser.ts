export interface IUserGet {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    warehouseIds: number[];
}

export interface IUserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: number;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserPatch {
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
}

export interface IUserForgotPwd {
    email: string;
    password: string;
}

export interface IUserChangePwd {
    email: string;
    oldpassword: string;
    newpassword: string;
}

export interface IUserAssignWarehouse {
    userId: number;
    warehuseId: number;
}