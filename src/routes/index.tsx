import { useAuthContext } from '@/context/auth.context';
import { PrivateRoutes } from '@/routes/PrivateRoutes';
import { PublicRoutes } from '@/routes/PublicRoutes';
import { Loading } from '@/screens/Loading';

import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';

const NavigationRoutes = () => {
  const { user, token } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const Routes = useCallback(
    () =>
      loading ? (
        <Loading setLoading={setLoading} />
      ) : !!(user && token) ? (
        <PrivateRoutes />
      ) : (
        <PublicRoutes />
      ),
    [user, token, loading]
  );

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />

      <Routes />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
