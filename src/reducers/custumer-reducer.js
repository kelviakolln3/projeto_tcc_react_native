import {FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE} from '../actions/custumer/custumer_load/custumer-load-action-types';

const initialState = {
    loadin: false,
    list: [],
    error: null
  };

const custumers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DATA_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

export default custumers;