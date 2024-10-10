import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { addPedido } from '../../../src/actions/orders/orderAddAction';
import { ADDING_REQUEST, ADDING_SUCCESS, ADDING_FAILURE } from '../../../src/actions/orders/orderAddActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/orders/ordersLoadActionTypes';
import { faker } from '@faker-js/faker';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('addPedido actions', () => { //Tempo de montagem 02 min e 44 seg 
    let store;

    beforeEach(() => {
        store = mockStore({
            orders: {
                list: []
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should dispatch ADDING_REQUEST and ADDING_SUCCESS when adding a order is successful', async () => {
        const mockData =
        {
            idCliente: faker.number.int(),
            idUsuario: faker.number.int(),
            dataCriacao: faker.date.recent().toISOString(),
            condicaoPagamento: faker.string.alpha(10),
            formaPagamento: faker.string.alpha(10),
            total: faker.number.float(),
            itemPedidoBeans: [
                {
                    idProduto: faker.number.int(),
                    quantidade: faker.number.float(),
                    valorUnitario: faker.number.float(),
                }
            ]
        };

        // Simula uma resposta bem-sucedida
        axios.post.mockResolvedValueOnce({ status: 200, data: mockData });

        // Despacha a ação addPedido
        await store.dispatch(addPedido(mockData));

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });

        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [mockData]
        });
        expect(actions[2]).toEqual({ type: ADDING_SUCCESS });
    });

    it('should dispatch ADDING_REQUEST and ADDING_FAILURE when adding a order fails', async () => {
        const errorMessage = 'Network error';

        // Simula um erro na requisição
        axios.post.mockRejectedValueOnce(new Error(errorMessage));

        // Despacha a ação addPedido
        await store.dispatch(addPedido());

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });
        expect(actions[1]).toEqual({ type: ADDING_FAILURE, error: errorMessage });
    });

    it('should dispatch ADDING_REQUEST and ADDING_FAILURE when response is not ok', async () => {
        // Simula uma resposta com status 404
        axios.post.mockResolvedValueOnce({ status: 404 });

        // Despacha a ação addPedido
        await store.dispatch(addPedido());

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });
        expect(actions[1]).toEqual({ type: ADDING_FAILURE, error: 'Network response was not ok.' });
    });
});
