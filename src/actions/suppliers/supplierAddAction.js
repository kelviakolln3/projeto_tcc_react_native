import axios from 'axios';
import { ADDING_REQUEST, ADDING_SUCCESS, ADDING_FAILURE } from './supplierAddActionTypes';
import { FETCH_DATA_SUCCESS } from './suppliersLoadActionTypes'

export const addFornecedor = (body) => async (dispatch, getState) => {
    dispatch({ type: ADDING_REQUEST });

    try {
      const response = await axios.post('http://192.168.0.15:8080/fornecedor', body);
      if (response.status == 200) {
        const data = await response.data;
        const { list: fornecedores } = getState().suppliers

        const updatedFornecedores = [...fornecedores, data];
        dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedFornecedores });
        dispatch({ type: ADDING_SUCCESS });
      } else {
          throw new Error('Network response was not ok.');
      }
    } catch (error) {
      dispatch({ type: ADDING_FAILURE, error: error.message });
    }
  };
