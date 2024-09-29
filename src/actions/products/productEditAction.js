import axios from 'axios';
import { FIND_REQUEST, FIND_SUCCESS, FIND_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE } from './productEditActionTypes';
import { FETCH_DATA_SUCCESS } from './productsLoadActionTypes'

export const fetchData = (idProdudo) => async (dispatch) => {
    dispatch({ type: FIND_REQUEST });
    try {
      const response = await axios.get(`http://192.168.0.17:8080/produto/${idProdudo}`);
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

export const editProduto = (body, idProduto) => async (dispatch, getState) => {
    dispatch({ type: EDIT_REQUEST });
    
    try {
        const response = await axios.put(`http://192.168.0.17:8080/produto/${idProduto}`, body);
        if (response.status == 200) {
            const { list: produtos } = getState().products
            const updatedProdutos = produtos.map(produto => produto.idProduto === idProduto ? response.data : produto);
            dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedProdutos });
            dispatch({ type: EDIT_SUCCESS});
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        dispatch({ type: EDIT_FAILURE, error: error.message });
    }
};