import { ILoginFormParams } from '@/screens/Login/LoginForm/indext';
import { IFormRegisterProps } from '@/screens/Register/RegisterForm';
import { IUser } from '@/shared/interfaces/https/userInterface';
import { autenticate, registerUser } from '@/shared/services/dt-money/auth.service';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (payload: ILoginFormParams) => Promise<void>;
  handleRegister: (payload: IFormRegisterProps) => Promise<void>;
  handleLogout: VoidFunction;
  restoreUserSession?: () => Promise<string | null>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async (payload: ILoginFormParams) => {
    const { user, token } = await autenticate(payload);

    await SecureStore.setItemAsync('dt-money-user', JSON.stringify({ user, token }));

    setUser(user);
    setToken(token);
  };

  const handleRegister = async (payload: IFormRegisterProps) => {
    const { user, token } = await registerUser(payload);

    await SecureStore.setItemAsync('dt-money-user', JSON.stringify({ user, token }));

    setUser(user);
    setToken(token);
  };

  const restoreUserSession = async () => {
    const storedData = await SecureStore.getItemAsync('dt-money-user');
    if (!storedData) return null;

    const { user, token } = JSON.parse(storedData);

    setUser(user);
    setToken(token);

    return token;
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
