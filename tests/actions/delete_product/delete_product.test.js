import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { deleteProduto } from '../../../src/actions/products/productDeleteAction';
import { DELETE_REQUEST, DELETE_FAILURE } from '../../../src/actions/products/productDeleteActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/products/productsLoadActionTypes';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('deleteProduto actions', () => { //Tempo de montagem 15 min e 30 seg 
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

    it('should dispatch DELETE_REQUEST and FETCH_DATA_SUCCESS when deleting a product is successful', async () => {
        const idProdutoToDelete = 1;

        axios.delete.mockResolvedValueOnce({ status: 200 });

        await store.dispatch(deleteProduto(idProdutoToDelete));

        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: DELETE_REQUEST });
        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [{ idProduto: 2, nome: 'Lapis' }]
        });
    });

    it('should dispatch DELETE_REQUEST and DELETE_FAILURE when deleting a product fails', async () => {
        const idClienteToDelete = 1;
        const errorMessage = 'Network error';

        // Simula um erro na requisição
        axios.delete.mockRejectedValueOnce(new Error(errorMessage));

        // Despacha a ação deleteProduto
        await store.dispatch(deleteProduto(idClienteToDelete));

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: DELETE_REQUEST });
        expect(actions[1]).toEqual({ type: DELETE_FAILURE, error: true });
    });
});
