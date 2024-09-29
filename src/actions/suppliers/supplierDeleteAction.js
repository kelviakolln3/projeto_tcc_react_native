import axios from 'axios';
import { DELETE_REQUEST, DELETE_FAILURE } from './supplierDeleteActionTypes';
import { FETCH_DATA_SUCCESS } from './suppliersLoadActionTypes';

export const deleteFornecedor = (idFornecedor) => async (dispatch, getState) => {
    dispatch({ type: DELETE_REQUEST });
    try {
      const response = await axios.delete(`http://192.168.0.17:8080/fornecedor/${idFornecedor}`);
      if (response.status == 200) {
        const { list: fornecedores } = getState().suppliers

        const updatedFornecedores = fornecedores.filter(fornecedor => fornecedor.idFornecedor !== idFornecedor);
        dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedFornecedores });
      } else {
          throw new Error('Network response was not ok.');
      }
    } catch (error) {
      dispatch({ type: DELETE_FAILURE, error: true });
    }
  }; 