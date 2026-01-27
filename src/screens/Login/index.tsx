import { AuthHeader } from '@/components/AuthHeader';
import { DismissKeyboardView } from '@/components/DismissKeyboardView';
import { LoginForm } from '@/screens/Login/LoginForm/indext';

import { View } from 'react-native';

export const LoginScreen = () => {
  return (
    <DismissKeyboardView>
      <View className="w-[82%] flex-1 self-center">
        <AuthHeader />

        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
};
