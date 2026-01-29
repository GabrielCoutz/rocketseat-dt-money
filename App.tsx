import { Snackbar } from '@/components/Snackbar';
import './global.css';

import { AuthContextProvider } from '@/context/auth.context';
import { SnackbarContextProvider } from '@/context/snackbar.context';

import NavigationRoutes from '@/routes';

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <NavigationRoutes />

        <Snackbar />
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}
