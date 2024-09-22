import { ADDING_REQUEST, ADDING_SUCCESS, ADDING_FAILURE } from '../actions/products/productAddActionTypes';

const initialState = {
    loading: false,
    error: null,
    close: false,
};

const productAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDING_REQUEST:
            return { ...state, loading: true, error: null, close: false };
        case ADDING_SUCCESS:
            return { ...state, loading: false, error: null, close: true };
        case ADDING_FAILURE:
            return { ...state, loading: false, error: action.error, close: false };
        default:
            return state;
    }
};

export default productAddReducer;