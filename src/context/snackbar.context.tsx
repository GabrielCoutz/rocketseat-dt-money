import { createContext, PropsWithChildren, useContext, useState } from 'react';

export type ISnackbarMessageType = 'success' | 'error';

export interface INotifyProps {
  message: string;
  type: ISnackbarMessageType;
}

interface ISnackbarContext {
  message: string | null;
  type: ISnackbarMessageType | null;
  notify: (params: INotifyProps) => void;
}

export const SnackbarContext = createContext<ISnackbarContext>({} as ISnackbarContext);

export const SnackbarContextProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<ISnackbarMessageType | null>(null);

  const notify = ({ message, type }: INotifyProps) => {
    setMessage(message);
    setType(type);

    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3 * 1000); // 3 seconds
  };

  return (
    <SnackbarContext.Provider value={{ message, type, notify }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => useContext(SnackbarContext);
