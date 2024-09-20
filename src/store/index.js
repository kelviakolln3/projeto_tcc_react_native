import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import custumerLoadReducer from '../reducers/custumerLoadReducer'
import productsLoadReducer from '../reducers/productsLoadReducer'
import suppliersLoadReducer from '../reducers/suppliersLoadReducer';

 const Store = configureStore({
        reducer: {
            custumers: custumerLoadReducer,
            products: productsLoadReducer,
            suppliers: suppliersLoadReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: false, // Disable the serializable check
            }),
    },
    applyMiddleware(thunk),
);

export default Store;