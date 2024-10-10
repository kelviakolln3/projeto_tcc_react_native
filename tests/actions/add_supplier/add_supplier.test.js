import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { addFornecedor } from '../../../src/actions/suppliers/supplierAddAction';
import { ADDING_REQUEST, ADDING_SUCCESS, ADDING_FAILURE } from '../../../src/actions/suppliers/supplierAddActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/suppliers/suppliersLoadActionTypes';
import { faker } from '@faker-js/faker';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('addFornecedor actions', () => { //Tempo de montagem 04 min e 18 seg 
    let store;

    beforeEach(() => {
        store = mockStore({
            suppliers: {
                list: []
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should dispatch ADDING_REQUEST and ADDING_SUCCESS when adding a supplier is successful', async () => {
        const mockData = 
            {
                codigo: faker.number.int(),
                atividade: faker.string.alpha(20),
                empresa: faker.string.alpha(20),
                contato: faker.phone.number(),
                endereco: faker.location.streetAddress(),
                email: faker.internet.email(),
            };

        // Simula uma resposta bem-sucedida
        axios.post.mockResolvedValueOnce({ status: 200, data: mockData });

        // Despacha a ação addFornecedor
        await store.dispatch(addFornecedor(mockData));

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });

        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [mockData]
        });
        expect(actions[2]).toEqual({ type: ADDING_SUCCESS });
    });

    it('should dispatch ADDING_REQUEST and ADDING_FAILURE when adding a supplier fails', async () => {
        const errorMessage = 'Network error';

        // Simula um erro na requisição
        axios.post.mockRejectedValueOnce(new Error(errorMessage));

        // Despacha a ação addFornecedor
        await store.dispatch(addFornecedor());

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });
        expect(actions[1]).toEqual({ type: ADDING_FAILURE, error: errorMessage });
    });

    it('should dispatch ADDING_REQUEST and ADDING_FAILURE when response is not ok', async () => {
        // Simula uma resposta com status 404
        axios.post.mockResolvedValueOnce({ status: 404 });

        // Despacha a ação addFornecedor
        await store.dispatch(addFornecedor());

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });
        expect(actions[1]).toEqual({ type: ADDING_FAILURE, error: 'Network response was not ok.' });
    });
});
