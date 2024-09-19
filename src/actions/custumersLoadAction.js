import axios from 'axios';
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './custumerLoadActionTypes';

export const fetchData = () => async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    try {
      const response = await axios.get('http://192.168.30.126:8080/cliente');
      if (response.status == 200) {
          const data = await response['data'];
          dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
      } else {
          throw new Error('Network response was not ok.');
      }
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, error: error.message });
    }
  };
