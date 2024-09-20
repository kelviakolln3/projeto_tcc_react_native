import { combineReducers} from '@reduxjs/toolkit'
import custumerReducer from './custumerLoadReducer'
import custumeReducer from './custumerReducerCopy'

const rootReducer = combineReducers({
    custumer: custumerReducer, 
    custume: custumeReducer 
});

export default rootReducer;