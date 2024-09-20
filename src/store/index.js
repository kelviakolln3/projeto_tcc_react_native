import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import custumerReducer from '../reducers/custumerLoadReducer'
import productsLoadReducer from '../reducers/productsLoadReducer'
  
 const Store = configureStore({
        reducer: {
            custumers: custumerReducer,
            products: productsLoadReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: false, // Disable the serializable check
            }),
    },
    applyMiddleware(thunk),
);

export default Store;