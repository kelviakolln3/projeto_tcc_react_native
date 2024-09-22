import { combineReducers} from '@reduxjs/toolkit'
import custumersLoadReducer from './custumerLoadReducer'
import custumerAddReducer from './custumerAddReducer';
import custumerDeleteReducer from './custumerDeleteReducer';

import productsReducer from './productsLoadReducer'
import productAddReducer from './productAddReducer';
import productDeleteReducer from './productDeleteReducer';

import suppliersLoadReducer from './suppliersLoadReducer';
import supplierAddReducer from './supplierAddReducer';
import supplierDeleteReducer from './supplierDeleteReducer';

import ordersLoadReducer from './ordersLoadReducer';
import orderDeleteReducer from './orderDeleteReducer';

const rootReducer = combineReducers({
    custumersLoad: custumersLoadReducer, 
    custumerAdd: custumerAddReducer,
    custumerDelete: custumerDeleteReducer,

    productsLoad: productsReducer,
    productAdd: productAddReducer,
    productDelete: productDeleteReducer,

    suppliersLoad: suppliersLoadReducer,
    supplierAdd: supplierAddReducer,
    supplierDelete: supplierDeleteReducer,

    ordersLoad: ordersLoadReducer,
    orderDelete: orderDeleteReducer
});

export default rootReducer;