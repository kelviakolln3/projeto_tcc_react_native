import { configureStore } from 'redux';
import {reducers} from '../reducers/custumer-reducer';
  
const store = configureStore(reducers);

export default store;