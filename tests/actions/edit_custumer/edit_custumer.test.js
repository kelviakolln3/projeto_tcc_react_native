import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { editCliente } from '../../../src/actions/custumers/custumerEditAction';
import { EDIT_REQUEST, EDIT_FAILURE } from '../../../src/actions/custumers/custumerEditActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/custumers/custumersLoadActionTypes';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('editCliente actions', () => { //Tempo de montagem 06 min e 53 seg 
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

    it('should dispatch EDIT_REQUEST and FETCH_DATA_SUCCESS when editing a client is successful', async () => {
        const idClienteToEdit = 1;
        const updatedCliente = { idCliente: 1, nome: 'John Smith' };
        const body = { nome: 'John Smith' }; // Dados que você está enviando para editar

        // Simula uma resposta bem-sucedida da requisição de edição
        axios.put.mockResolvedValueOnce({ status: 200, data: updatedCliente });

        // Despacha a ação editCliente
        await store.dispatch(editCliente(body, idClienteToEdit));

        const actions = store.getActions();

        // Verifica se EDIT_REQUEST foi disparado primeiro
        expect(actions[0]).toEqual({ type: EDIT_REQUEST });

        // Verifica se FETCH_DATA_SUCCESS foi disparado com a lista atualizada de clientes
        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [{ idCliente: 1, nome: 'John Smith' }, { idCliente: 2, nome: 'Jane Doe' }] // Verifica que o cliente foi atualizado
        });

        // Verifica se EDIT_SUCCESS foi disparado
        expect(actions[2]).toEqual({ type: 'EDIT_SUCCESS' });
    });

    it('should dispatch EDIT_REQUEST and EDIT_FAILURE when editing a client fails', async () => {
        const idClienteToEdit = 1;
        const body = { nome: 'John Smith' };
        const errorMessage = 'Network error';

        // Simula um erro na requisição
        axios.put.mockRejectedValueOnce(new Error(errorMessage));

        // Despacha a ação editCliente
        await store.dispatch(editCliente(body, idClienteToEdit));

        const actions = store.getActions();

        // Verifica se EDIT_REQUEST foi disparado primeiro
        expect(actions[0]).toEqual({ type: EDIT_REQUEST });

        // Verifica se EDIT_FAILURE foi disparado com a mensagem de erro
        expect(actions[1]).toEqual({ type: EDIT_FAILURE, error: errorMessage });
    });
});
