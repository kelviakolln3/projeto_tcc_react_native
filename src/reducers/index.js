import { combineReducers} from '@reduxjs/toolkit'
import custumersLoadReducer from './custumerLoadReducer'
import custumerAddReducer from './custumerAddReducer';
import custumerEditReducer from './custumerEditReducer';
import custumerDeleteReducer from './custumerDeleteReducer';

import productsReducer from './productsLoadReducer'
import productAddReducer from './productAddReducer';
import productEditReducer from './productEditReducer';
import productDeleteReducer from './productDeleteReducer';

import suppliersLoadReducer from './suppliersLoadReducer';
import supplierAddReducer from './supplierAddReducer';
import supplierEditReducer from './supplierEditReducer';
import supplierDeleteReducer from './supplierDeleteReducer';

import ordersLoadReducer from './ordersLoadReducer';
import orderAddReducer from './orderAddReducer';
import orderEditReducer from './orderEditReducer';
import orderDeleteReducer from './orderDeleteReducer';

const rootReducer = combineReducers({
    custumersLoad: custumersLoadReducer, 
    custumerAdd: custumerAddReducer,
    custumerEdit: custumerEditReducer,
    custumerDelete: custumerDeleteReducer,

    productsLoad: productsReducer,
    productAdd: productAddReducer,
    productEdit: productEditReducer,
    productDelete: productDeleteReducer,

    suppliersLoad: suppliersLoadReducer,
    supplierAdd: supplierAddReducer,
    supplierEdit: supplierEditReducer,
    supplierDelete: supplierDeleteReducer,

    ordersLoad: ordersLoadReducer,
    orderAdd: orderAddReducer,
    orderEdit: orderEditReducer,
    orderDelete: orderDeleteReducer
});

export default rootReducer;