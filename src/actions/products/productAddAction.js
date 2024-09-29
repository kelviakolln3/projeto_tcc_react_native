import axios from 'axios';
import { ADDING_REQUEST, ADDING_SUCCESS, ADDING_FAILURE } from './productAddActionTypes';
import { FETCH_DATA_SUCCESS } from './productsLoadActionTypes'

export const addProduto = (body) => async (dispatch, getState) => {
    dispatch({ type: ADDING_REQUEST });

    try {
      const response = await axios.post('http://192.168.0.17:8080/produto', body);
      if (response.status == 200) {
        const data = await response.data;
        const { list: produtos } = getState().products

        const updatedProdutos = [...produtos, data];
        dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedProdutos });
        dispatch({ type: ADDING_SUCCESS });
      } else {
          throw new Error('Network response was not ok.');
      }
    } catch (error) {
      dispatch({ type: ADDING_FAILURE, error: error.message });
    }
  };
