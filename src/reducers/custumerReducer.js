import {FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE} from '../actions/custumerLoadActionTypes';

const initialState = {
    loading: false,
    list: [],
    error: null
};

const custumerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return { ...state, loading: true };
        case FETCH_DATA_SUCCESS:
            return { ...state, loading: false, list: action.payload };
        case FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default custumerReducer;