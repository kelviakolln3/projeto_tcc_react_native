import { combineReducers} from '@reduxjs/toolkit'
import custumerReducer from './custumerLoadReducer'
import productsReducer from './productsLoadReducer'
import custumerLoadReducer from './custumerLoadReducer';

const rootReducer = combineReducers({
    custumerLoad: custumerReducer, 
    productsLoad: productsReducer,
    suppliersLoad: custumerLoadReducer
});

export default rootReducer;