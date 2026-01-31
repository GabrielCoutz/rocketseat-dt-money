import { useTransactionContext } from '@/context/transaction';
import { ListHeader } from '@/screens/Home/ListHeader';
import { TransactionCard } from '@/screens/Home/TransactionCard';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loading,
    loadMoreTransactions,
    pagination,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error);
    }
  };

  const handleFetchInitialTransactions = async () => {
    try {
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, 'Falha ao buscar transações');
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      await loadMoreTransactions(pagination);
    } catch (error) {
      handleError(error, 'Falha ao carregar novas transações');
    }
  };

  const handleRefreshTransactions = async () => {
    try {
      await refreshTransactions();
    } catch (error) {
      handleError(error, 'Falha ao recarregar as transações');
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([handleFetchCategories(), handleFetchInitialTransactions()]);
    })();
  }, []);

  if (loading && transactions.length === 0) {
    return <ActivityIndicator className="flex-1 bg-background-secondary" />;
  }
  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      <FlatList
        data={transactions}
        keyExtractor={({ id, createdAt }) => `transaction-${id}-${createdAt}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefreshTransactions} />
        }
        ListHeaderComponent={ListHeader}
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};
