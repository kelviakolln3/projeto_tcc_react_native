import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { addProduto } from '../../../src/actions/products/productAddAction';
import { ADDING_REQUEST, ADDING_SUCCESS, ADDING_FAILURE } from '../../../src/actions/products/productAddActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/products/productsLoadActionTypes';
import { faker } from '@faker-js/faker';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('addProduto actions', () => { //Tempo de montagem 04 min e 48 seg 
    let store;

    beforeEach(() => {
        store = mockStore({
            products: {
                list: []
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should dispatch ADDING_REQUEST and ADDING_SUCCESS when adding a product is successful', async () => {
        const mockData = 
            {
                codigo: faker.number.int(),
                nome: faker.string.alpha(20),
                codigoBarras: faker.number.int(14).toString(),
                estoque: faker.number.float(),
                grupo: faker.string.alpha(10),
                marca: faker.string.alpha(10),
                valorVenda: faker.number.float(),
            };

        // Simula uma resposta bem-sucedida
        axios.post.mockResolvedValueOnce({ status: 200, data: mockData });

        // Despacha a ação addCliente
        await store.dispatch(addProduto(mockData));

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });

        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [mockData]
        });
        expect(actions[2]).toEqual({ type: ADDING_SUCCESS });
    });

    it('should dispatch ADDING_REQUEST and ADDING_FAILURE when adding a product fails', async () => {
        const errorMessage = 'Network error';

        // Simula um erro na requisição
        axios.post.mockRejectedValueOnce(new Error(errorMessage));

        // Despacha a ação addCliente
        await store.dispatch(addProduto());

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });
        expect(actions[1]).toEqual({ type: ADDING_FAILURE, error: errorMessage });
    });

    it('should dispatch ADDING_REQUEST and ADDING_FAILURE when response is not ok', async () => {
        // Simula uma resposta com status 404
        axios.post.mockResolvedValueOnce({ status: 404 });

        // Despacha a ação addCliente
        await store.dispatch(addProduto());

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });
        expect(actions[1]).toEqual({ type: ADDING_FAILURE, error: 'Network response was not ok.' });
    });
});
