import { useTransactionContext } from '@/context/transaction';
import { ListHeader } from '@/screens/Home/ListHeader';
import { TransactionCard } from '@/screens/Home/TransactionCard';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const { fetchCategories, fetchTransactions, transactions } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([handleFetchCategories(), fetchTransactions()]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      <FlatList
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
      />
    </SafeAreaView>
  );
};
