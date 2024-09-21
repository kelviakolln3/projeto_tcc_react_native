import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import custumerLoadReducer from '../reducers/custumerLoadReducer'
import custumerDeleteReducer from '../reducers/custumerDeleteReducer'
import productsLoadReducer from '../reducers/productsLoadReducer'
import suppliersLoadReducer from '../reducers/suppliersLoadReducer';
import ordersLoadReducer from '../reducers/ordersLoadReducer';

 const Store = configureStore({
        reducer: {
            custumers: custumerLoadReducer,
            custumerDelete: custumerDeleteReducer,
            products: productsLoadReducer,
            suppliers: suppliersLoadReducer,
            orders: ordersLoadReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: false,
            }),
    },
    applyMiddleware(thunk),
);

export default Store;