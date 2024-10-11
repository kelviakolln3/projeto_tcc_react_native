import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { editProduto } from '../../../src/actions/products/productEditAction';
import { EDIT_REQUEST, EDIT_FAILURE } from '../../../src/actions/products/productEditActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/products/productsLoadActionTypes';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('editProduto actions', () => { //Tempo de montagem 06 min e 42 seg 
    let store;

    beforeEach(() => {
        store = mockStore({
            products: {
                list: [
                    { idProduto: 1, nome: 'Caneta' },
                    { idProduto: 2, nome: 'Lapis' }
                ]
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    it('should dispatch EDIT_REQUEST and FETCH_DATA_SUCCESS when editing a product is successful', async () => {
        const idProdutoToEdit = 1;
        const updatedProduto = { idProduto: 1, nome: 'Caneta' };
        const body = { nome: 'Caneta' }; // Dados que você está enviando para editar

        // Simula uma resposta bem-sucedida da requisição de edição
        axios.put.mockResolvedValueOnce({ status: 200, data: updatedProduto });

        // Despacha a ação editProduto
        await store.dispatch(editProduto(body, idProdutoToEdit));

        const actions = store.getActions();

        // Verifica se EDIT_REQUEST foi disparado primeiro
        expect(actions[0]).toEqual({ type: EDIT_REQUEST });

        // Verifica se FETCH_DATA_SUCCESS foi disparado com a lista atualizada de produtos
        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [{ idProduto: 1, nome: 'Caneta' }, { idProduto: 2, nome: 'Lapis' }] // Verifica que o produto foi atualizado
        });

        // Verifica se EDIT_SUCCESS foi disparado
        expect(actions[2]).toEqual({ type: 'EDIT_SUCCESS' });
    });

    it('should dispatch EDIT_REQUEST and EDIT_FAILURE when editing a product fails', async () => {
        const idProdutoToEdit = 1;
        const body = { nome: 'Caneta' };
        const errorMessage = 'Network error';

        // Simula um erro na requisição
        axios.put.mockRejectedValueOnce(new Error(errorMessage));

        // Despacha a ação editProduto
        await store.dispatch(editProduto(body, idProdutoToEdit));

        const actions = store.getActions();

        // Verifica se EDIT_REQUEST foi disparado primeiro
        expect(actions[0]).toEqual({ type: EDIT_REQUEST });

        // Verifica se EDIT_FAILURE foi disparado com a mensagem de erro
        expect(actions[1]).toEqual({ type: EDIT_FAILURE, error: errorMessage });
    });
});
