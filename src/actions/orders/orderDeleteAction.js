import axios from 'axios';
import { DELETE_REQUEST, DELETE_FAILURE } from './orderDeleteActionTypes';
import { FETCH_DATA_SUCCESS } from './ordersLoadActionTypes';

export const deletePedido = (idPedido, itemPedidoList) => async (dispatch, getState) => {
    dispatch({ type: DELETE_REQUEST });
    try {
        for (let index = 0; index < itemPedidoList.length; index++) {
            await axios.delete(`http://192.168.0.17:8080/item-pedido/${itemPedidoList[index].idItemPedido}`);
        }
        const response = await axios.delete(`http://192.168.0.17:8080/pedido/${idPedido}`);
        if (response.status == 200) {
            const { list: pedidos } = getState().orders

            const updatedPedidos = pedidos.filter(pedido => pedido.idPedido !== idPedido);
            dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedPedidos });
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
      dispatch({ type: DELETE_FAILURE, error: true });
    }
  }; 