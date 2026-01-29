import { useSnackbarContext } from '@/context/snackbar.context';
import { AppError } from '@/shared/helpers/AppError';

export const useErrorHandler = () => {
  const { notify } = useSnackbarContext();

  const handleError = (error: unknown, defaultMessage = 'Falha inesperada') => {
    const isAppError = error instanceof AppError;

    const message = isAppError ? error.message : defaultMessage;

    notify({
      type: 'error',
      message,
    });
  };

  return {
    handleError,
  };
};
