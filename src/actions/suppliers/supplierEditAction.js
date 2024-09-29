import axios from 'axios';
import { FIND_REQUEST, FIND_SUCCESS, FIND_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE } from './supplierEditActionTypes';
import { FETCH_DATA_SUCCESS } from './suppliersLoadActionTypes'

export const fetchData = (idFornecedor) => async (dispatch) => {
    dispatch({ type: FIND_REQUEST });
    try {
      const response = await axios.get(`http://192.168.0.17:8080/fornecedor/${idFornecedor}`);
      if (response.status == 200) {
          const data = await response['data'];
          dispatch({ type: FIND_SUCCESS, payload: data });
      } else {
          throw new Error('Network response was not ok.');
      }
    } catch (error) {
      dispatch({ type: FIND_FAILURE, error: error.message });
    }
  };

export const editFornecedor = (body, idFornecedor) => async (dispatch, getState) => {
    dispatch({ type: EDIT_REQUEST });
    
    try {
        const response = await axios.put(`http://192.168.0.17:8080/fornecedor/${idFornecedor}`, body);
        if (response.status == 200) {
            const { list: fornecedores } = getState().suppliers
            const updatedFornecedores = fornecedores.map(fornecedor => fornecedor.idFornecedor === idFornecedor ? response.data : fornecedor);
            dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedFornecedores });
            dispatch({ type: EDIT_SUCCESS});
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        dispatch({ type: EDIT_FAILURE, error: error.message });
    }
};