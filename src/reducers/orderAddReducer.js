import { ADDING_REQUEST, ADDING_SUCCESS, ADDING_FAILURE, ORDER_ITEM } from '../actions/orders/orderAddActionTypes';

const initialState = {
    loading: false,
    error: null,
    close: false,
    itensPedido: []
};

const orderAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDING_REQUEST:
            return { ...state, loading: true, error: null, close: false };
        case ADDING_SUCCESS:
            return { ...state, loading: false, error: null, close: true };
        case ADDING_FAILURE:
            return { ...state, loading: false, error: action.error, close: false };
        case ORDER_ITEM:
            return { ...state, itensPedido: action.payload }
        default:
            return state;
    }
};

export default orderAddReducer;