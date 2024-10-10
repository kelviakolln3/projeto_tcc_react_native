import axios from 'axios';
import { ADDING_REQUEST, ADDING_SUCCESS, ADDING_FAILURE, ORDER_ITEM } from './orderAddActionTypes';
import { FETCH_DATA_SUCCESS } from './ordersLoadActionTypes'

export const addPedido = (body) => async (dispatch, getState) => {
    dispatch({ type: ADDING_REQUEST });

    try {
      const response = await axios.post('http://192.168.0.15:8080/pedido/inserir-pedido', body);
      if (response.status == 200) {
        const data = await response.data;
        const { list: pedidos } = getState().orders

        const updatedPedidos = [...pedidos, data];
        dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedPedidos });
        dispatch({ type: ADDING_SUCCESS });
      } else {
          throw new Error('Network response was not ok.');
      }
    } catch (error) {
      dispatch({ type: ADDING_FAILURE, error: error.message });
    }
  };

export const addItemPedido = (item) => async (dispatch, getState) => {
    const { itensPedido: itensPedido } = getState().orderAdd
    const updatedItensPedido = [...itensPedido, item];
    dispatch({ type: ORDER_ITEM, payload: updatedItensPedido });
};

export const removeItemPedido = (item) => async (dispatch, getState) => {
    const { itensPedido: itensPedido } = getState().orderAdd
    const updatedItensPedido = itensPedido.filter(itemPedido => itemPedido.idProduto !== item.idProduto);
    dispatch({ type: ORDER_ITEM, payload: updatedItensPedido });
};