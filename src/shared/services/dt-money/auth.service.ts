import { ILoginFormParams } from '@/screens/Login/LoginForm/indext';
import { IFormRegisterProps } from '@/screens/Register/RegisterForm';
import { dtMoneyApi } from '@/shared/api/dt-money';
import { IAuthenticateResponse } from '@/shared/interfaces/https/autenticate-responde';

export const autenticate = async (payload: ILoginFormParams): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>('/auth/login', payload);

  return data;
};

export const registerUser = async (payload: IFormRegisterProps): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>('/auth/register', payload);

  return data;
};
