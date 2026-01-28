import { AuthHeader } from '@/components/AuthHeader';
import { DismissKeyboardView } from '@/components/DismissKeyboardView';
import { RegisterForm } from '@/screens/Register/RegisterForm';
import { View } from 'react-native';

export const RegisterScreen = () => {
  return (
    <DismissKeyboardView>
      <View className="w-[82%] flex-1 self-center">
        <AuthHeader />

        <RegisterForm />
      </View>
    </DismissKeyboardView>
  );
};
