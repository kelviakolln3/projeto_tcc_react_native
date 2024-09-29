import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import custumerLoadReducer from '../reducers/custumerLoadReducer'
import custumerAddReducer from '../reducers/custumerAddReducer';
import custumerEditReducer from '../reducers/custumerEditReducer';
import custumerDeleteReducer from '../reducers/custumerDeleteReducer'

import productsLoadReducer from '../reducers/productsLoadReducer'
import productAddReducer from '../reducers/productAddReducer';
import productEditReducer from '../reducers/productEditReducer';
import productDeleteReducer from '../reducers/productDeleteReducer';

import suppliersLoadReducer from '../reducers/suppliersLoadReducer';
import supplierAddReducer from '../reducers/supplierAddReducer';
import supplierDeleteReducer from '../reducers/supplierDeleteReducer';

import ordersLoadReducer from '../reducers/ordersLoadReducer';
import orderAddReducer from '../reducers/orderAddReducer';
import orderDeleteReducer from '../reducers/orderDeleteReducer';

 const Store = configureStore({
        reducer: {
            custumers: custumerLoadReducer,
            custumerAdd: custumerAddReducer,
            custumerEdit: custumerEditReducer,
            custumerDelete: custumerDeleteReducer,

            products: productsLoadReducer,
            productAdd: productAddReducer,
            productEdit: productEditReducer,
            productDelete: productDeleteReducer,

            suppliers: suppliersLoadReducer,
            supplierAdd: supplierAddReducer,
            supplierDelete: supplierDeleteReducer,

            orders: ordersLoadReducer,
            orderAdd: orderAddReducer,
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