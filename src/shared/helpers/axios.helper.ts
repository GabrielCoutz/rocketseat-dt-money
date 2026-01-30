import { IAuthenticateResponse } from '@/shared/interfaces/https/autenticate-responde';
import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

export const addTokenToRequest = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const userData = await SecureStore.getItemAsync('dt-money-user');

    if (userData) {
      const { token } = JSON.parse(userData) as IAuthenticateResponse;

      if (!config.headers) {
        config.headers = {} as InternalAxiosRequestConfig['headers'];
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });
};
