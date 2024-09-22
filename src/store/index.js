import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import custumerLoadReducer from '../reducers/custumerLoadReducer'
import custumerDeleteReducer from '../reducers/custumerDeleteReducer'

import productsLoadReducer from '../reducers/productsLoadReducer'
import productDeleteReducer from '../reducers/productDeleteReducer';

import suppliersLoadReducer from '../reducers/suppliersLoadReducer';

import ordersLoadReducer from '../reducers/ordersLoadReducer';
import orderDeleteReducer from '../reducers/orderDeleteReducer';

 const Store = configureStore({
        reducer: {
            custumers: custumerLoadReducer,
            custumerDelete: custumerDeleteReducer,
            products: productsLoadReducer,
            productDelete: productDeleteReducer,
            suppliers: suppliersLoadReducer,
            orders: ordersLoadReducer,
            orderDelete: orderDeleteReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: false,
            }),
    },
    applyMiddleware(thunk),
);

export default Store;