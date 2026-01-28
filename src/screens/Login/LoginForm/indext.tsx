import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { IPublicStackParamsList } from '@/routes/PublicRoutes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

export interface ILoginFormParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { control, handleSubmit, formState } = useForm<ILoginFormParams>();
  const { navigate } = useNavigation<NavigationProp<IPublicStackParamsList>>();

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        placeholder="exemplo@gmail.com"
        leftIconName="mail-outline"
      />

      <AppInput
        control={control}
        name="password"
        label="SENHA"
        leftIconName="lock-outline"
        secureTextEntry
        placeholder="Sua senha"
      />

      <View className="mb-6 mt-8 min-h-[250px] flex-1 justify-between">
        <AppButton iconName="arrow-forward">Logar</AppButton>

        <View>
          <Text className="mb-6 text-base text-gray-300">Ainda não tem uma conta?</Text>

          <AppButton mode="outline" iconName="arrow-forward" onPress={() => navigate('register')}>
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  );
};
