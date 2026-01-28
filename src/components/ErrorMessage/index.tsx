import { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/shared/colors';

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <View className="mt-1.5 flex-row items-center">
      <MaterialIcons
        name="error-outline"
        size={16}
        color={colors['accent-red-background-primary']}
        className="mr-1"
      />

      <Text className="text-accent-red-background-primary">{children}</Text>
    </View>
  );
};
