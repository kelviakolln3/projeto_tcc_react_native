import axios from 'axios';
import { DELETE_REQUEST, DELETE_FAILURE } from './orderDeleteActionTypes';
import { FETCH_DATA_SUCCESS } from './ordersLoadActionTypes';

export const deletePedido = (idPedido, itemPedidoList) => async (dispatch, getState) => {
    dispatch({ type: DELETE_REQUEST });
    try {
        // Deletar os itens do pedido
        for (const item of itemPedidoList) {
            await axios.delete(`http://192.168.0.15:8080/item-pedido/${item.idItemPedido}`);
        }

        // Deletar o pedido
        const response = await axios.delete(`http://192.168.0.15:8080/pedido/${idPedido}`);
        if (response.status === 200) {
            const { list: pedidos } = getState().orders; // Certifique-se de que 'list' é a propriedade correta
            const updatedPedidos = pedidos.filter(pedido => pedido.idPedido !== idPedido);
            dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedPedidos });
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        dispatch({ type: DELETE_FAILURE, error: true });
    }
};