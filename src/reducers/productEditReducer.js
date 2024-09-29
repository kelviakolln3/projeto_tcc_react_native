import { FIND_REQUEST, FIND_SUCCESS, FIND_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE } from '../actions/products/productEditActionTypes';

const initialState = {
    loadingFind: false,
    errorFind: null,
    product: null,
    loadingEdit: false,
    errorEdit: null,
    close: false,
};

const productEditReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_REQUEST:
            return { ...state, loadingFind: true, errorFind: null };
        case FIND_SUCCESS:
            return { ...state, loadingFind: false, product: action.payload };
        case FIND_FAILURE:
            return { ...state, loadingFind: false, errorFind: action.error };
        case EDIT_REQUEST:
            return { ...state, loadingEdit: true, errorFind: null, close: false };
        case EDIT_SUCCESS:
            return { ...state, loadingEdit: false, errorEdit: null, close: true };
        case EDIT_FAILURE:
            return { ...state, loadingEdit: false, errorEdit: action.error, close: false };
        default:
            return state;
    }
};

export default productEditReducer;