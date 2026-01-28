import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { IPublicStackParamsList } from '@/routes/PublicRoutes';
import { schema } from '@/screens/Login/LoginForm/schema';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@/context/auth.context';
import { AxiosError } from 'axios';
export interface ILoginFormParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { handleAuthenticate } = useAuthContext();
  const { navigate } = useNavigation<NavigationProp<IPublicStackParamsList>>();
  const { control, handleSubmit, formState } = useForm<ILoginFormParams>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (payload: ILoginFormParams) => {
    try {
      await handleAuthenticate(payload);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

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
        <AppButton iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
          Logar
        </AppButton>

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
