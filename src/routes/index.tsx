import { useAuthContext } from '@/context/auth.context';
import { PrivateRoutes } from '@/routes/PrivateRoutes';
import { PublicRoutes } from '@/routes/PublicRoutes';

import { NavigationContainer } from '@react-navigation/native';
import { useCallback } from 'react';
import { StatusBar } from 'react-native';

const NavigationRoutes = () => {
  const { user, token } = useAuthContext();

  const Routes = useCallback(
    () => (!!(user && token) ? <PrivateRoutes /> : <PublicRoutes />),
    [user, token]
  );

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />

      <Routes />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
