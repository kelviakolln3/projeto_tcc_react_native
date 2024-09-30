import { FIND_REQUEST, FIND_SUCCESS, FIND_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE, ORDER_ITEM } from '../actions/orders/orderEditActionTypes';

const initialState = {
    loadingFind: false,
    errorFind: null,
    custumer: null,
    loadingEdit: false,
    errorEdit: null,
    close: false,
    order: null, 
    itensPedido: [],
};

const orderEditReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_REQUEST:
            return { ...state, loadingFind: true, errorFind: null };
        case FIND_SUCCESS:
            return { ...state, loadingFind: false, order: action.payload, itensPedido: action.payload.itemPedidoBeans || [] };
        case FIND_FAILURE:
            return { ...state, loadingFind: false, errorFind: action.error };
        case EDIT_REQUEST:
            return { ...state, loadingEdit: true, errorFind: null, close: false };
        case EDIT_SUCCESS:
            return { ...state, loadingEdit: false, errorEdit: null, close: true };
        case EDIT_FAILURE:
            return { ...state, loadingEdit: false, errorEdit: action.error, close: false };
        case ORDER_ITEM:
            return { ...state, itensPedido: action.payload };
        default:
            return state;
    }
};

export default orderEditReducer;