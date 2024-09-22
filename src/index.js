import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Store from './store';

import Login from './pages/login/index';
import Home from './pages/home/index';

import CustumerLoad from './pages/custumers/custumers_load/index';
import CustumerAdd from './pages/custumers/custumer_add/index'

import ProductsLoad from './pages/products/products_load/index'
import ProductAdd from './pages/products/product_add/index';

import SuppliersLoad from './pages/suppliers/suppliers_load/index';
import SupplierAdd from './pages/suppliers/suppliers_add/index';

import OrdersLoad from './pages/orders/orders_load';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CustumerLoad" component={CustumerLoad} /> 
          <Stack.Screen name="CustumerAdd" component={CustumerAdd}/>
          <Stack.Screen name="ProductsLoad" component={ProductsLoad}/>
          <Stack.Screen name="ProductAdd" component={ProductAdd}/>
          <Stack.Screen name="SuppliersLoad" component={SuppliersLoad}/>
          <Stack.Screen name="SupplierAdd" component={SupplierAdd}/>
          <Stack.Screen name="OrdersLoad" component={OrdersLoad}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}