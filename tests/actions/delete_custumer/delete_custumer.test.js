import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { deleteCliente } from '../../../src/actions/custumers/custumerDeleteAction';
import { DELETE_REQUEST, DELETE_FAILURE } from '../../../src/actions/custumers/custumerDeleteActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/custumers/custumersLoadActionTypes';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('deleteCliente actions', () => { //Tempo de montagem 15 min e 30 seg 
    let store;

    beforeEach(() => {
        store = mockStore({
            custumers: {
                list: [
                    { idCliente: 1, nome: 'John Doe' },
                    { idCliente: 2, nome: 'Jane Doe' }
                ]
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    it('should dispatch DELETE_REQUEST and FETCH_DATA_SUCCESS when deleting a client is successful', async () => {
        const idClienteToDelete = 1;

        // Simula uma resposta bem-sucedida da requisição de exclusão
        axios.delete.mockResolvedValueOnce({ status: 200 });

        // Despacha a ação deleteCliente
        await store.dispatch(deleteCliente(idClienteToDelete));

        const actions = store.getActions();

        // Verifica se DELETE_REQUEST foi disparado primeiro
        expect(actions[0]).toEqual({ type: DELETE_REQUEST });

        // Verifica se FETCH_DATA_SUCCESS foi disparado com a lista atualizada de clientes
        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [{ idCliente: 2, nome: 'Jane Doe' }]  // Verifica que o cliente foi removido
        });
    });

    it('should dispatch DELETE_REQUEST and DELETE_FAILURE when deleting a client fails', async () => {
        const idClienteToDelete = 1;
        const errorMessage = 'Network error';

        // Simula um erro na requisição
        axios.delete.mockRejectedValueOnce(new Error(errorMessage));

        // Despacha a ação deleteCliente
        await store.dispatch(deleteCliente(idClienteToDelete));

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: DELETE_REQUEST });
        expect(actions[1]).toEqual({ type: DELETE_FAILURE, error: true });
    });
});
