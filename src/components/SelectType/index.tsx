import { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import { colors } from '@/shared/colors';
import { TransactionType } from '@/shared/enums/transaction-types';

interface Props {
  setTransactionType: (type: TransactionType) => void;
  typeId?: number;
}

export const TransactionTypeSelector: FC<Props> = ({ setTransactionType, typeId }) => {
  return (
    <View className="mt-4 flex-row justify-between gap-2">
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionType.REVENUE)}
        className={clsx(
          'h-[58px] flex-1 flex-row items-center justify-center rounded-md p-2',
          typeId === TransactionType.REVENUE
            ? 'bg-accent-brand-background-primary'
            : 'bg-background-tertiary'
        )}>
        <MaterialIcons
          name="arrow-circle-up"
          color={typeId === TransactionType.REVENUE ? colors.white : colors['accent-brand-light']}
          size={24}
          className="mr-2"
        />
        <Text className="text-white">Entrada</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionType.EXPENSE)}
        className={clsx(
          'h-[58px] flex-1 flex-row items-center justify-center rounded-md p-2',
          typeId === TransactionType.EXPENSE
            ? 'bg-accent-red-background-primary'
            : 'bg-background-tertiary'
        )}>
        <MaterialIcons
          name="arrow-circle-down"
          color={typeId === TransactionType.EXPENSE ? colors.white : colors['accent-red']}
          size={24}
          className="mr-2"
        />
        <Text className="text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  );
};
