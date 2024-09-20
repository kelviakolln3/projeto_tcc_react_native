import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import custumerLoadReducer from '../reducers/custumerLoadReducer'
import productsLoadReducer from '../reducers/productsLoadReducer'
import suppliersLoadReducer from '../reducers/suppliersLoadReducer';
import ordersLoadReducer from '../reducers/ordersLoadReducer';

 const Store = configureStore({
        reducer: {
            custumers: custumerLoadReducer,
            products: productsLoadReducer,
            suppliers: suppliersLoadReducer,
            orders: ordersLoadReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: false, // Disable the serializable check
            }),
    },
    applyMiddleware(thunk),
);

export default Store;