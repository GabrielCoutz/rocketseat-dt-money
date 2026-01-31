export interface Transaction {
  id: number;
  value: number;
  description: string;
  categoryId: number;
  typeId: number;
  type: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface TotalTransactions {
  revenue: number;
  expense: number;
  total: number;
}
export interface GetTransactionsParams {
  page: number;
  perPage: number;
  from?: Date;
  to?: Date;
  typeId?: number;
  categoryId?: number;
  searchText?: string;
}

export interface GetTransactionsResponse {
  data: Transaction[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: TotalTransactions;
}
