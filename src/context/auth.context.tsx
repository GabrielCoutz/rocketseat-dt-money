import { ILoginFormParams } from '@/screens/Login/LoginForm/indext';
import { IFormRegisterProps } from '@/screens/Register/RegisterForm';
import { IUser } from '@/shared/interfaces/https/userInterface';
import { autenticate } from '@/shared/services/dt-money/auth.service';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (payload: ILoginFormParams) => Promise<void>;
  handleRegister: (payload: IFormRegisterProps) => Promise<void>;
  handleLogout: VoidFunction;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async (payload: ILoginFormParams) => {
    const { user, token } = await autenticate(payload);

    setUser(user);
    setToken(token);
  };

  const handleRegister = async (payload: IFormRegisterProps) => {};

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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
