import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { deleteFornecedor } from '../../../src/actions/suppliers/supplierDeleteAction';
import { DELETE_REQUEST, DELETE_FAILURE } from '../../../src/actions/suppliers/supplierDeleteActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/suppliers/suppliersLoadActionTypes';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('deleteFornecedor actions', () => { //Tempo de montagem 15 min e 30 seg 
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

    it('should dispatch DELETE_REQUEST and FETCH_DATA_SUCCESS when deleting a supplier is successful', async () => {
        const idFornecedorToDelete = 1;

        axios.delete.mockResolvedValueOnce({ status: 200 });
        await store.dispatch(deleteFornecedor(idFornecedorToDelete));

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: DELETE_REQUEST });
        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [{ idFornecedor: 2, empresa: 'Samsung' }]
        });
    });

    it('should dispatch DELETE_REQUEST and DELETE_FAILURE when deleting a supplier fails', async () => {
        const idClienteToDelete = 1;
        const errorMessage = 'Network error';

        axios.delete.mockRejectedValueOnce(new Error(errorMessage));

        await store.dispatch(deleteFornecedor(idClienteToDelete));

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: DELETE_REQUEST });
        expect(actions[1]).toEqual({ type: DELETE_FAILURE, error: true });
    });
});
