import { useTransactionContext } from '@/context/transaction';
import { EmptyList } from '@/screens/Home/EmptyList';
import { ListHeader } from '@/screens/Home/ListHeader';
import { TransactionCard } from '@/screens/Home/TransactionCard';
import { colors } from '@/shared/colors';
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
    handleLoadings,
    loadings,
    loadMoreTransactions,
    pagination,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      handleLoadings({
        key: 'initial',
        value: true,
      });
      await fetchCategories();
    } catch (error) {
      handleError(error);
    } finally {
      handleLoadings({
        key: 'initial',
        value: false,
      });
    }
  };

  const handleFetchInitialTransactions = async () => {
    try {
      handleLoadings({
        key: 'initial',
        value: true,
      });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, 'Falha ao buscar transações');
    } finally {
      handleLoadings({
        key: 'initial',
        value: false,
      });
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      handleLoadings({
        key: 'loadMore',
        value: true,
      });

      await loadMoreTransactions(pagination);
    } catch (error) {
      handleError(error, 'Falha ao carregar novas transações');
    } finally {
      handleLoadings({
        key: 'loadMore',
        value: false,
      });
    }
  };

  const handleRefreshTransactions = async () => {
    try {
      handleLoadings({
        key: 'refresh',
        value: true,
      });
      await refreshTransactions();
    } catch (error) {
      handleError(error, 'Falha ao recarregar as transações');
    } finally {
      handleLoadings({
        key: 'refresh',
        value: false,
      });
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([handleFetchCategories(), handleFetchInitialTransactions()]);
    })();
  }, []);

  if (loadings.initial && transactions.length === 0) {
    return <ActivityIndicator className="flex-1 bg-background-secondary" />;
  }
  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      <FlatList
        data={transactions}
        keyExtractor={({ id, createdAt }) => `transaction-${id}-${createdAt}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        refreshControl={
          <RefreshControl refreshing={loadings.refresh} onRefresh={handleRefreshTransactions} />
        }
        ListHeaderComponent={ListHeader}
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={loadings.initial ? null : EmptyList}
        ListFooterComponent={
          loadings.loadMore ? (
            <ActivityIndicator color={colors['accent-brand-light']} size="large" />
          ) : null
        }
      />
    </SafeAreaView>
  );
};
