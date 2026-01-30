import { Snackbar } from '@/components/Snackbar';
import './global.css';

import { AuthContextProvider } from '@/context/auth.context';
import { SnackbarContextProvider } from '@/context/snackbar.context';

import NavigationRoutes from '@/routes';
import { BottomSheetProvider } from '@/context/bottom-sheet.context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TransactionContextProvider } from '@/context/transaction';

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackbarContextProvider>
        <AuthContextProvider>
          <TransactionContextProvider>
            <BottomSheetProvider>
              <NavigationRoutes />

              <Snackbar />
            </BottomSheetProvider>
          </TransactionContextProvider>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  );
}
