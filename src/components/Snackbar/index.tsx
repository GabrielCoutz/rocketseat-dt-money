import { useSnackbarContext } from '@/context/snackbar.context';
import { Text, View } from 'react-native';

export const Snackbar = () => {
  const { message, type } = useSnackbarContext();

  const shouldRender = !!(message && type);
  if (!shouldRender) return null;

  const bgColor = `${type === 'success' ? 'bg-accent-brand-background-primary' : 'bg-accent-red-background-primary'}`;

  return (
    <View
      className={`absolute bottom-10 h-[50px] w-[90%] self-center rounded-xl ${bgColor} z-10 justify-center p-2 px-4`}>
      <Text className="text-base font-bold text-white">{message}</Text>
    </View>
  );
};
