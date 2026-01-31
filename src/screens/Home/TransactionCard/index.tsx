import { FC } from 'react';
import { Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/shared/colors';

import clsx from 'clsx';
import { Transaction } from '@/shared/interfaces/https/transaction';
import { TransactionType } from '@/shared/enums/transaction-types';
import { RightAction } from '@/screens/Home/TransactionCard/RightAction';

interface Params {
  transaction: Transaction;
}

export const TransactionCard: FC<Params> = ({ transaction }) => {
  const isExpense = transaction.type.id === TransactionType.EXPENSE;

  return (
    <Swipeable
      containerStyle={{
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'visible',
        width: '90%',
        marginBottom: 16,
      }}
      renderRightActions={() => <RightAction transactionId={transaction.id} />}
      overshootRight={false}>
      <View className="h-[140] rounded-md bg-background-tertiary p-6">
        <Text className="text-base text-white">{transaction.description}</Text>
        <Text
          className={clsx(
            'mt-2 text-xl font-bold',
            isExpense ? 'text-accent-red' : 'text-accent-brand-light'
          )}>
          {isExpense && '-'}R$ {transaction.value.toFixed(2).replace('.', ',')}
        </Text>
        <View className="w-full flex-row items-center justify-between">
          <View className="mt-3 flex-row items-center">
            <MaterialIcons name="label-outline" color={colors.gray[700]} size={23} />
            <Text className="ml-2 text-base text-gray-700">{transaction.category.name}</Text>
          </View>
          <View className="mt-3 flex-row items-center">
            <MaterialIcons name="calendar-month" color={colors.gray[700]} size={20} />
            <Text className="ml-2 text-base text-gray-700">
              {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
