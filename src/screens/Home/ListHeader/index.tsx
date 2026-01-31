import { AppHeader } from '@/components/AppHeader';
import { useTransactionContext } from '@/context/transaction';
import { TransactionCard } from '@/screens/Home/ListHeader/TransactionCard';
import { TransactionType } from '@/shared/enums/transaction-types';
import { ScrollView, View } from 'react-native';

export const ListHeader = () => {
  const { totalTransactions } = useTransactionContext();

  return (
    <>
      <AppHeader />

      <View className="h-[150] w-full">
        <View className="h-[50] bg-background-primary" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute h-[141] pl-6">
          <TransactionCard type={TransactionType.EXPENSE} amount={totalTransactions.expense} />
          <TransactionCard type={TransactionType.REVENUE} amount={totalTransactions.revenue} />
          <TransactionCard type={'total'} amount={totalTransactions.total} />
        </ScrollView>
      </View>
    </>
  );
};
