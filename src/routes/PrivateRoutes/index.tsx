import { HomeScreen } from '@/screens/Home';
import { createStackNavigator } from '@react-navigation/stack';

export type IPrivateStackParamsList = {
  home: undefined;
};

export const PrivateRoutes = () => {
  const PrivateStack = createStackNavigator<IPrivateStackParamsList>();

  return (
    <PrivateStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PrivateStack.Screen name="home" component={HomeScreen} />
    </PrivateStack.Navigator>
  );
};
