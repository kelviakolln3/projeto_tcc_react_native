import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import custumerReducer from '../reducers/custumerReducer'
import custumeReducer from '../reducers/custumerReducerCopy'
  
 const Store = configureStore({
        reducer: {
            custumers: custumerReducer,
            custume: custumeReducer
        },
    },
    applyMiddleware(thunk)
);

export default Store;