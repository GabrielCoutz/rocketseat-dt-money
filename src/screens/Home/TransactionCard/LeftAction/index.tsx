import { FC } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/shared/colors';
import { useBottomSheetContext } from '@/context/bottom-sheet.context';
import { Transaction } from '@/shared/interfaces/https/transaction';
import { Pressable } from 'react-native-gesture-handler';
import { EditTransactionForm } from '@/screens/Home/TransactionCard/LeftAction/EditTransactionForm';

interface Params {
  transaction: Transaction;
}

export const LeftAction: FC<Params> = ({ transaction }) => {
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <Pressable
      onPress={() => {
        openBottomSheet(<EditTransactionForm transaction={transaction} />, 1);
      }}>
      <View className="h-[140] w-[80] items-center justify-center rounded-l-md bg-[#284DAA]">
        <MaterialIcons name="edit" size={30} color={colors.white} />
      </View>
    </Pressable>
  );
};
