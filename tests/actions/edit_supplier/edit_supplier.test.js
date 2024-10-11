import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { editFornecedor } from '../../../src/actions/suppliers/supplierEditAction';
import { EDIT_REQUEST, EDIT_FAILURE } from '../../../src/actions/suppliers/supplierEditActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/suppliers/suppliersLoadActionTypes';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('editFornecedor actions', () => { //Tempo de montagem 03 min e 18 seg 
    let store;

    beforeEach(() => {
        store = mockStore({
            suppliers: {
                list: [
                    { idFornecedor: 1, empresa: 'Apple' },
                    { idFornecedor: 2, empresa: 'Samsung' }
                ]
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    it('should dispatch EDIT_REQUEST and FETCH_DATA_SUCCESS when editing a client is successful', async () => {
        const idFornecedorToEdit = 1;
        const updatedFornecedor = { idFornecedor: 1, empresa: 'Apple' };
        const body = { empresa: 'Apple' }; // Dados que você está enviando para editar

        // Simula uma resposta bem-sucedida da requisição de edição
        axios.put.mockResolvedValueOnce({ status: 200, data: updatedFornecedor });

        // Despacha a ação editFornecedor
        await store.dispatch(editFornecedor(body, idFornecedorToEdit));

        const actions = store.getActions();

        // Verifica se EDIT_REQUEST foi disparado primeiro
        expect(actions[0]).toEqual({ type: EDIT_REQUEST });

        // Verifica se FETCH_DATA_SUCCESS foi disparado com a lista atualizada de fornecedores
        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [{ idFornecedor: 1, empresa: 'Apple' }, { idFornecedor: 2, empresa: 'Samsung' }] // Verifica que o fornecedor foi atualizado
        });

        // Verifica se EDIT_SUCCESS foi disparado
        expect(actions[2]).toEqual({ type: 'EDIT_SUCCESS' });
    });

    it('should dispatch EDIT_REQUEST and EDIT_FAILURE when editing a client fails', async () => {
        const idFornecedorToEdit = 1;
        const body = { empresa: 'Apple' };
        const errorMessage = 'Network error';

        // Simula um erro na requisição
        axios.put.mockRejectedValueOnce(new Error(errorMessage));

        // Despacha a ação editFornecedor
        await store.dispatch(editFornecedor(body, idFornecedorToEdit));

        const actions = store.getActions();

        // Verifica se EDIT_REQUEST foi disparado primeiro
        expect(actions[0]).toEqual({ type: EDIT_REQUEST });

        // Verifica se EDIT_FAILURE foi disparado com a mensagem de erro
        expect(actions[1]).toEqual({ type: EDIT_FAILURE, error: errorMessage });
    });
});
