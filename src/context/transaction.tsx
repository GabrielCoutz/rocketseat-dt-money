import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import * as transactionService from '@/shared/services/dt-money/transaction.service';
import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response';
import { CreateTransactionInterface } from '@/shared/interfaces/https/create-transaction-request';
import { Pagination, TotalTransactions, Transaction } from '@/shared/interfaces/https/transaction';
import { UpdateTransactionInterface } from '@/shared/interfaces/https/update-transaction-request';

interface FetchTransactionParams {
  page: number;
}

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategory[];
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
  fetchTransactions: (params: FetchTransactionParams) => Promise<void>;
  totalTransactions: TotalTransactions;
  loadMoreTransactions: (pagination: Pagination) => Promise<void>;
  transactions: Transaction[];
  refreshTransactions: () => Promise<void>;
  loading: boolean;
  pagination: Pagination;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>({
    expense: 0,
    revenue: 0,
    total: 0,
  });
  const fetchCategories = async () => {
    const categoriesResponse = await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionService.createTransaction(transaction);
  };

  const refreshTransactions = async () => {
    const { page, perPage } = pagination;

    setLoading(true);
    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: page * perPage,
    });
    setTransactions(transactionsResponse.data);
    setTotalTransactions(transactionsResponse.totalTransactions);
    setPagination({
      ...pagination,
      page,
      totalPages: transactionsResponse.totalPages,
      totalRows: transactionsResponse.totalRows,
    });
    setLoading(false);
  };

  const updateTransaction = async (transaction: UpdateTransactionInterface) => {
    await transactionService.updateTransaction(transaction);
  };

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 3,
    totalRows: 0,
    totalPages: 0,
  });

  const fetchTransactions = async ({ page = 1 }: FetchTransactionParams) => {
    setLoading(true);

    const transactionsResponse = await transactionService.getTransactions({
      page,
      perPage: pagination.perPage,
    });

    if (page === 1) {
      setTransactions(transactionsResponse.data);
    } else {
      setTransactions((prevState) => [...prevState, ...transactionsResponse.data]);
    }
    setTotalTransactions(transactionsResponse.totalTransactions);
    setPagination({
      ...pagination,
      page,
      totalRows: transactionsResponse.totalRows,
      totalPages: transactionsResponse.totalPages,
    });
    setLoading(false);
  };

  const loadMoreTransactions = async (pagination: Pagination) => {
    if (loading || pagination.page >= (pagination?.totalPages ?? 0)) return;
    fetchTransactions({ page: pagination.page + 1 });
  };

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        totalTransactions,
        transactions,
        updateTransaction,
        refreshTransactions,
        loadMoreTransactions,
        loading,
        pagination,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
