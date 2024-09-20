import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Store from './store';

import Login from './pages/login/index';
import Home from './pages/home/index';
import CustumerLoad from './pages/custumers/custumers_load/index';
import ProductsLoad from './pages/products/products_load/index'
import SuppliersLoad from './pages/suppliers/suppliers_load/index';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CustumerLoad" component={CustumerLoad} /> 
          <Stack.Screen name="ProductsLoad" component={ProductsLoad}/>
          <Stack.Screen name="SuppliersLoad" component={SuppliersLoad}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}