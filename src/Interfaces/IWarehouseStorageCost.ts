export interface IDailyStorageCost {
  date: string;
  cost: number;
}

export interface IProductStorageCost {
  product: {
    id: number;
    name: string;
    ean: string;
    description?: string;
  };
  dailyCosts: IDailyStorageCost[];
}

export interface IWarehouseStorageCost {
  storageCosts: IProductStorageCost[];
}
