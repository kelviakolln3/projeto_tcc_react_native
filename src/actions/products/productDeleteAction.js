import axios from 'axios';
import { DELETE_REQUEST, DELETE_FAILURE } from './productDeleteActionTypes';
import { FETCH_DATA_SUCCESS } from './productsLoadActionTypes';

export const deleteProduto = (idProduto) => async (dispatch, getState) => {
    dispatch({ type: DELETE_REQUEST });
    try {
      const response = await axios.delete(`http://192.168.0.15:8080/produto/${idProduto}`);
      if (response.status == 200) {
        const { list: produtos } = getState().products

        const updatedProdutos = produtos.filter(produto => produto.idProduto !== idProduto);
        dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedProdutos });
      } else {
          throw new Error('Network response was not ok.');
      }
    } catch (error) {
      dispatch({ type: DELETE_FAILURE, error: true });
    }
  }; 