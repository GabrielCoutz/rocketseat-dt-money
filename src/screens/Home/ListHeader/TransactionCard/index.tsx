import { FC } from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TransactionType } from '@/shared/enums/transaction-types';
import { useTransactionContext } from '@/context/transaction';
import { ICONS } from '@/screens/Home/ListHeader/TransactionCard/strategies/icon-strategy';
import { CARD_DATA } from '@/screens/Home/ListHeader/TransactionCard/strategies/cad-data-strategy';

export type TransactionCardType = TransactionType | 'total';

interface Props {
  type: TransactionCardType;
  amount: number;
}

export const TransactionCard: FC<Props> = ({ type, amount }) => {
  const { transactions } = useTransactionContext();

  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  );

  return (
    <View
      className={`bg-${cardData.bgColor} mr-6 min-w-[280] justify-between rounded-md px-8 py-6`}>
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-base text-white">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
      </View>
      <View>
        <Text className="text-2xl font-bold text-gray-400">
          R$ {amount.toFixed(2).replace('.', ',')}
        </Text>
        {type !== 'total' && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? `Última ${cardData.label.toLowerCase()} em ${new Intl.DateTimeFormat('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                }).format(new Date(lastTransaction.createdAt))}`
              : 'Nenhuma transação encontrada'}
          </Text>
        )}
      </View>
    </View>
  );
};
