import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { editPedido } from '../../../src/actions/orders/orderEditAction';
import { EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE } from '../../../src/actions/orders/orderEditActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/orders/ordersLoadActionTypes';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('editPedido action', () => { //Tempo de montagem 06 min e 53 seg 
    let store;

    beforeEach(() => {
        store = mockStore({
            orders: {
                list: [
                    { idPedido: 1, dataCriacao: '2024-10-10', condicaoPagamento: 'A vista' },
                    { idPedido: 2, dataCriacao: '2024-10-11', condicaoPagamento: 'Credito' }
                ]
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    it('should dispatch EDIT_REQUEST and FETCH_DATA_SUCCESS when editing a order is successful', async () => {
        const idPedidoToEdit = 1;
        const updatedPedido = { idPedido: 1, dataCriacao: '2024-10-10', condicaoPagamento: 'A vista' };
        const body = { condicaoPagamento: 'A vista' }; // Dados que você está enviando para editar

        // Simula uma resposta bem-sucedida da requisição de edição
        axios.post.mockResolvedValueOnce({ status: 200, data: updatedPedido });

        // Despacha a ação editPedido
        await store.dispatch(editPedido(body, idPedidoToEdit));

        const actions = store.getActions();

        // Verifica se EDIT_REQUEST foi disparado primeiro
        expect(actions[0]).toEqual({ type: EDIT_REQUEST });

        // Verifica se FETCH_DATA_SUCCESS foi disparado com a lista atualizada de pedidos
        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [
                { idPedido: 1, dataCriacao: '2024-10-10', condicaoPagamento: 'A vista' },
                { idPedido: 2, dataCriacao: '2024-10-11', condicaoPagamento: 'Credito' }
            ]// Verifica que o pedido foi atualizado
        });

        // Verifica se EDIT_SUCCESS foi disparado
        expect(actions[2]).toEqual({ type: EDIT_SUCCESS });
    });

    it('should dispatch EDIT_REQUEST and EDIT_FAILURE when editing a order fails', async () => {
        const idPedidoToEdit = 1;
        const body = { condicaoPagamento: 'A vista' };
        const errorMessage = 'Network error';

        // Simula um erro na requisição
        axios.post.mockRejectedValueOnce(new Error(errorMessage));

        // Despacha a ação editCliente
        await store.dispatch(editPedido(body, idPedidoToEdit));

        const actions = store.getActions();

        // Verifica se EDIT_REQUEST foi disparado primeiro
        expect(actions[0]).toEqual({ type: EDIT_REQUEST });

        // Verifica se EDIT_FAILURE foi disparado com a mensagem de erro
        expect(actions[1]).toEqual({ type: EDIT_FAILURE, error: errorMessage });
    });
});
