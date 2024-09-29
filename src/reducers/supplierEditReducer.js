import { FIND_REQUEST, FIND_SUCCESS, FIND_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE } from '../actions/suppliers/supplierEditActionTypes';

const initialState = {
    loadingFind: false,
    errorFind: null,
    supplier: null,
    loadingEdit: false,
    errorEdit: null,
    close: false,
};

const supplierEditReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_REQUEST:
            return { ...state, loadingFind: true, errorFind: null };
        case FIND_SUCCESS:
            return { ...state, loadingFind: false, supplier: action.payload };
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

export default supplierEditReducer;