import { useTransactionContext } from '@/context/transaction';
import clsx from 'clsx';
import Checkbox from 'expo-checkbox';
import { FC, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface Props {
  selectedCategory: number;
  onSelect: (categoryId: number) => void;
}

export const SelectCategoryModal: FC<Props> = ({ onSelect, selectedCategory }) => {
  const [showModal, setShowModal] = useState(false);

  const { categories } = useTransactionContext();

  const handleModal = () => setShowModal((prevState) => !prevState);

  const selected = useMemo(() => {
    return categories.find((category) => category.id === selectedCategory);
  }, [categories, selectedCategory]);

  const handleSelect = (categoryId: number) => {
    onSelect(categoryId);
    setShowModal(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleModal}
        className="my-2 h-[50] justify-center rounded-[6] bg-background-primary pl-4">
        <Text className={clsx('text-lg', selected ? 'text-white' : 'text-gray-700')}>
          {selected?.name ?? 'Categoria'}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <View className="w-[90%] rounded-xl bg-background-secondary p-4">
              <Text className="mb-4 text-lg text-white">Selecione uma categoria</Text>
              <FlatList
                data={categories}
                keyExtractor={(item) => `category-${item.id}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.id)}
                    className="mb-2 flex-row items-center rounded-lg bg-gray-800 p-4">
                    <Checkbox
                      value={selected?.id === item.id}
                      onValueChange={() => handleSelect(item.id)}
                      className="mr-2"
                    />
                    <Text className="text-lg text-white">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
