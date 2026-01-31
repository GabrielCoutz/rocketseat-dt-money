import { FC } from 'react';
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/shared/colors';

interface Params {
  visible: boolean;
  hideModal: () => void;
  handleDeleteTransaction: () => void;
  loading: boolean;
}

export const DeleteModal: FC<Params> = ({
  visible,
  hideModal,
  handleDeleteTransaction,
  loading,
}) => {
  return (
    <View className="absolute flex-1">
      <Modal animationType="slide" transparent visible={visible} onRequestClose={hideModal}>
        <TouchableWithoutFeedback onPress={hideModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="z-9 m-5 h-[322] w-[90%] items-center rounded-[16] bg-background-secondary p-8 shadow-lg">
                <View className="w-full flex-row items-center justify-between border-b border-gray-300 pb-6">
                  <View className="flex-row items-center gap-6">
                    <MaterialIcons
                      name="error-outline"
                      className="mr-4"
                      color={colors.gray[400]}
                      size={25}
                    />
                    <Text className="text-lg text-white">Apagar transação?</Text>
                  </View>
                  <TouchableOpacity>
                    <MaterialIcons name="close" color={colors.gray[800]} size={25} />
                  </TouchableOpacity>
                </View>

                <View className="flex-1 items-center justify-center border-b border-gray-300">
                  <Text className="text-lg leading-8 text-gray-500">
                    Tem certeza que deseja apagar essa transação? Esta ação não pode ser desfeita
                  </Text>
                </View>

                <View className="w-full flex-row justify-end gap-4 p-6 pb-0 pr-0">
                  <TouchableOpacity
                    className="w-[100] items-center justify-center rounded-md border-2 border-accent-brand bg-none p-3"
                    onPress={hideModal}>
                    <Text className="text-accent-brand">Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDeleteTransaction}
                    className="w-[100] items-center justify-center rounded-md bg-accent-red-background-primary p-3">
                    <Text className="text-white">{loading ? <ActivityIndicator /> : 'Apagar'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
