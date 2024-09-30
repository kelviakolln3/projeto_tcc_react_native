import axios from 'axios';
import { FIND_REQUEST, FIND_SUCCESS, FIND_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE, ORDER_ITEM } from './orderEditActionTypes';
import { FETCH_DATA_SUCCESS } from './ordersLoadActionTypes'

export const fetchData = (idPedido) => async (dispatch) => {
    dispatch({ type: FIND_REQUEST });
    try {
      const response = await axios.get(`http://192.168.0.17:8080/pedido/get-all-bean/${idPedido}`);
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

export const editPedido = (body, idPedido) => async (dispatch, getState) => {
    dispatch({ type: EDIT_REQUEST });

    try {
      const response = await axios.post('http://192.168.0.17:8080/pedido/inserir-pedido', body);
      if (response.status == 200) {
        const data = await response.data;
        const { list: pedidos } = getState().orders

        const updatedPedidos = pedidos.map(pedido => pedido.idPedido === idPedido ? response.data : pedido);
        dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedPedidos });
        dispatch({ type: EDIT_SUCCESS });
      } else {
          throw new Error('Network response was not ok.');
      }
    } catch (error) {
      dispatch({ type: EDIT_FAILURE, error: error.message });
    }
  };

export const addItemPedido = (item) => async (dispatch, getState) => {
    const { itensPedido: itensPedido } = getState().orderEdit
    const updatedItensPedido = [...itensPedido, item];
    dispatch({ type: ORDER_ITEM, payload: updatedItensPedido });
};

export const removeItemPedido = (item) => async (dispatch, getState) => {
    if (item.idItemPedido != null) {
        try {
            await axios.delete(`http://192.168.0.17:8080/item-pedido/${item.idItemPedido}`);
        } catch (error) {
            console.error("Erro ao remover item do pedido:", error);
        }
    }

    const { itensPedido: itensPedido } = getState().orderEdit
    const updatedItensPedido = itensPedido.filter(itemPedido => itemPedido.idProduto !== item.idProduto);
    dispatch({ type: ORDER_ITEM, payload: updatedItensPedido });
};