import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store/index';
import Login from './pages/login/index';
import Home from './pages/home/index';
import CustumerLoad from './pages/custumers/custtumer_load/index';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CustumerLoad" component={CustumerLoad} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}