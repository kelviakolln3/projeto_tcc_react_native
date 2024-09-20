import { combineReducers} from '@reduxjs/toolkit'
import custumersLoadReducer from './custumerLoadReducer'
import productsReducer from './productsLoadReducer'
import suppliersLoadReducer from './suppliersLoadReducer';
import ordersLoadReducer from './ordersLoadReducer';

const rootReducer = combineReducers({
    custumersLoad: custumersLoadReducer, 
    productsLoad: productsReducer,
    suppliersLoad: suppliersLoadReducer,
    ordersLoad: ordersLoadReducer
});

export default rootReducer;