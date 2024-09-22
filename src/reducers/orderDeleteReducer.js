import { DELETE_REQUEST, DELETE_FAILURE } from '../actions/orders/orderDeleteActionTypes';

const initialState = {
    loadingDelete: false,
    errorDelete: false
};

const orderDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_REQUEST:
            return { ...state, loadingDelete: true, errorDelete: false };
        case DELETE_FAILURE:
            return { ...state, loadingDelete: false, errorDelete: action.error };
        default:
            return state;
    }
};

export default orderDeleteReducer;