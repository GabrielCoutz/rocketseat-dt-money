import { FC, useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/shared/colors';

import CurrencyInput from 'react-native-currency-input';

import * as Yup from 'yup';

import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { AppButton } from '@/components/AppButton';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SelectCategoryModal } from '@/components/SelectCategoryModal';
import { TransactionTypeSelector } from '@/components/SelectType';
import { UpdateTransactionInterface } from '@/shared/interfaces/https/update-transaction-request';
import { Transaction } from '@/shared/interfaces/https/transaction';
import { useBottomSheetContext } from '@/context/bottom-sheet.context';
import { useTransactionContext } from '@/context/transaction';
import { transactionSchema } from './schema';

type ValidationErrorsTypes = Record<keyof UpdateTransactionInterface, string>;

interface Params {
  transaction: Transaction;
}

export const EditTransactionForm: FC<Params> = ({ transaction: transactionToUpdate }) => {
  const { closeBottomSheet } = useBottomSheetContext();
  const { updateTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const [loading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState<UpdateTransactionInterface>({
    categoryId: transactionToUpdate.categoryId,
    description: transactionToUpdate.description,
    id: transactionToUpdate.id,
    typeId: transactionToUpdate.typeId,
    value: transactionToUpdate.value,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrorsTypes>();

  const handleCreateTransaction = async () => {
    try {
      setLoading(true);
      await transactionSchema.validate(transaction, {
        abortEarly: false,
      });

      await updateTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidationErrorsTypes;
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof UpdateTransactionInterface] = err.message;
          }
        });
        setValidationErrors(errors);
      } else {
        handleError(error, 'Falha ao atualizar transação');
      }
    } finally {
      setLoading(false);
    }
  };

  const setTransactionData = (key: keyof UpdateTransactionInterface, value: string | number) => {
    setTransaction((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        onPress={closeBottomSheet}
        className="w-full flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Nova transação</Text>
        <MaterialIcons name="close" color={colors.gray[700]} size={20} />
      </TouchableOpacity>

      <View className="my-8 flex-1">
        <TextInput
          onChangeText={(text) => setTransactionData('description', text)}
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          className="my-2 h-[50px] rounded-md bg-background-primary pl-4 text-lg text-white"
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}
        <CurrencyInput
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData('value', value ?? 0)}
          className="my-2 h-[50px] rounded-md bg-background-primary pl-4 text-lg text-white"
        />
        {validationErrors?.value && <ErrorMessage>{validationErrors.value}</ErrorMessage>}

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) => setTransactionData('categoryId', categoryId)}
        />
        {validationErrors?.categoryId && <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>}

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData('typeId', typeId)}
        />
        {validationErrors?.typeId && <ErrorMessage>{validationErrors.typeId}</ErrorMessage>}

        <View className="my-4">
          <AppButton onPress={handleCreateTransaction} disabled={loading}>
            {loading ? <ActivityIndicator color={colors.white} /> : 'Atualizar'}
          </AppButton>
        </View>
      </View>
    </View>
  );
};
