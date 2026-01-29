import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { IPublicStackParamsList } from '@/routes/PublicRoutes';
import { schema } from '@/screens/Login/LoginForm/schema';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@/context/auth.context';

import { useSnackbarContext } from '@/context/snackbar.context';
import { AppError } from '@/shared/helpers/AppError';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
export interface ILoginFormParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { handleAuthenticate } = useAuthContext();
  const { handleError } = useErrorHandler();
  const { navigate } = useNavigation<NavigationProp<IPublicStackParamsList>>();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ILoginFormParams>({
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
      handleError(error, 'Falha ao fazer login. Verifique suas credenciais.');
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
          {isSubmitting ? <ActivityIndicator color="#fff" /> : 'Logar'}
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
