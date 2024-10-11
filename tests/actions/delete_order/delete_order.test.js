import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { deletePedido } from '../../../src/actions/orders/orderDeleteAction';
import { DELETE_REQUEST, DELETE_FAILURE } from '../../../src/actions/orders/orderDeleteActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/orders/ordersLoadActionTypes';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('deletePedido actions', () => { //Tempo de montagem 14 min e 20 seg 
    let store;

    beforeEach(() => {
        store = mockStore({
            orders: {
                list: [
                    { idPedido: 1, dataCriacao: '2024-10-10' },
                    { idPedido: 2, dataCriacao: '2024-10-11' }
                ]
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    it('should dispatch DELETE_REQUEST and FETCH_DATA_SUCCESS when deleting a order is successful', async () => {
        const idPedidoToDelete = 1;
        const itemPedidoList = [{ idItemPedido: 1 }, { idItemPedido: 2 }];

        axios.delete.mockResolvedValueOnce({ status: 200 }); // Para item 1
        axios.delete.mockResolvedValueOnce({ status: 200 }); // Para item 2
        axios.delete.mockResolvedValueOnce({ status: 200 }); // Para pedido
        await store.dispatch(deletePedido(idPedidoToDelete, itemPedidoList));

        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: DELETE_REQUEST });
        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [{ idPedido: 2, dataCriacao: '2024-10-11' }] 
        });
    });

    it('should dispatch DELETE_REQUEST and DELETE_FAILURE when deleting a order fails', async () => {
        const idPedidoToDelete = 1;
        const itemPedidoList = [{ idItemPedido: 1 }, { idItemPedido: 2 }];
        const errorMessage = 'Network error';

        axios.delete.mockRejectedValueOnce(new Error(errorMessage));

        await store.dispatch(deletePedido(idPedidoToDelete, itemPedidoList));

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: DELETE_REQUEST });
        expect(actions[1]).toEqual({ type: DELETE_FAILURE, error: true });
    });
});
