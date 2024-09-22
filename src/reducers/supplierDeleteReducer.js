import { DELETE_REQUEST, DELETE_FAILURE } from '../actions/suppliers/supplierDeleteActionTypes';

const initialState = {
    loadingDelete: false,
    errorDelete: false
};

const supplierDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_REQUEST:
            return { ...state, loadingDelete: true, errorDelete: false };
        case DELETE_FAILURE:
            return { ...state, loadingDelete: false, errorDelete: action.error };
        default:
            return state;
    }
};

export default supplierDeleteReducer;