import { useAuthContext } from '@/context/auth.context';
import { Text, TouchableOpacity, View } from 'react-native';

export const HomeScreen = () => {
  const { handleLogout } = useAuthContext();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};
