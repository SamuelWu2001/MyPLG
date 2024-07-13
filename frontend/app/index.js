import React from 'react';
import BottomTabBar from '../src/components/molecule/BottomNavigation';
import LoginPage from '../src/components/page/LoginPage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { setNavigator } from '../src/utils/navigationService';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true} ref={(navigator) => setNavigator(navigator)}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Main" component={BottomTabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
