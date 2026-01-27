import { PrivateRoutes } from '@/routes/PrivateRoutes';
import { PublicRoutes } from '@/routes/PublicRoutes';

import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';

const NavigationRoutes = () => {
  const [user, setUser] = useState(null);

  const Routes = useCallback(() => (!!user ? <PrivateRoutes /> : <PublicRoutes />), [user]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />

      <Routes />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
