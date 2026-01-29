import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { IPublicStackParamsList } from '@/routes/PublicRoutes';
import { schema } from '@/screens/Register/RegisterForm/schema';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@/context/auth.context';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

export interface IFormRegisterProps {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { handleRegister } = useAuthContext();
  const { handleError } = useErrorHandler();
  const { navigate } = useNavigation<NavigationProp<IPublicStackParamsList>>();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IFormRegisterProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (payload: IFormRegisterProps) => {
    try {
      await handleRegister(payload);
    } catch (error) {
      handleError(error, 'Falha ao cadastrar. Tente novamente.');
    }
  };

  return (
    <>
      <AppInput
        control={control}
        name="name"
        label="NAME"
        placeholder="Seu nome completo"
        leftIconName="person-outline"
      />

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
        placeholder="Sua senha"
        secureTextEntry
      />

      <AppInput
        control={control}
        name="confirmPassword"
        label="SENHA"
        placeholder="Confirme sua senha"
        secureTextEntry
      />

      <View className="mb-6 mt-8 min-h-[250px] flex-1 justify-between">
        <AppButton
          iconName="arrow-forward"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}>
          {isSubmitting ? <ActivityIndicator color="#fff" /> : 'Cadastrar'}
        </AppButton>

        <View>
          <Text className="mb-6 text-base text-gray-300">Já tem uma conta?</Text>

          <AppButton mode="outline" iconName="arrow-forward" onPress={() => navigate('login')}>
            Acessar
          </AppButton>
        </View>
      </View>
    </>
  );
};
