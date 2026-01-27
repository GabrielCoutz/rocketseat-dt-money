import { LoginScreen } from '@/screens/Login';
import { RegisterScreen } from '@/screens/Register';
import { createStackNavigator } from '@react-navigation/stack';

export type IPublicStackParamsList = {
  login: undefined;
  register: undefined;
};

export const PublicRoutes = () => {
  const PublicStack = createStackNavigator<IPublicStackParamsList>();

  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PublicStack.Screen name="login" component={LoginScreen} />
      <PublicStack.Screen name="register" component={RegisterScreen} />
    </PublicStack.Navigator>
  );
};
