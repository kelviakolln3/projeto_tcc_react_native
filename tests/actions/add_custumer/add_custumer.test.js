import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { addCliente } from '../../../src/actions/custumers/custumerAddAction';
import { ADDING_REQUEST, ADDING_SUCCESS, ADDING_FAILURE } from '../../../src/actions/custumers/custumerAddActionTypes';
import { FETCH_DATA_SUCCESS } from '../../../src/actions/custumers/custumersLoadActionTypes';
import { faker } from '@faker-js/faker';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('addCliente actions', () => { //Tempo de montagem 24 min e 07 seg 
    let store;

    beforeEach(() => {
        store = mockStore({
            custumers: {
                list: []
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should dispatch ADDING_REQUEST and ADDING_SUCCESS when adding a client is successful', async () => {
        const mockData = 
            {
                idCliente: faker.number.int(),
                codigo: faker.number.int(),
                nome: faker.person.fullName(),
                cpf: faker.string.alpha(14),
                rg: faker.number.int({ max: 1000 }).toString(),
                endereco: faker.location.streetAddress(),
                dataNasc: faker.date.past().toISOString(),
                contato: faker.phone.number(),
                email: faker.internet.email(),
            };

        // Simula uma resposta bem-sucedida
        axios.post.mockResolvedValueOnce({ status: 200, data: mockData });

        // Despacha a ação addCliente
        await store.dispatch(addCliente(mockData));

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });

        expect(actions[1]).toEqual({
            type: FETCH_DATA_SUCCESS,
            payload: [mockData]
        });
        expect(actions[2]).toEqual({ type: ADDING_SUCCESS });
    });

    it('should dispatch ADDING_REQUEST and ADDING_FAILURE when adding a client fails', async () => {
        const errorMessage = 'Network error';

        // Simula um erro na requisição
        axios.post.mockRejectedValueOnce(new Error(errorMessage));

        // Despacha a ação addCliente
        await store.dispatch(addCliente());

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });
        expect(actions[1]).toEqual({ type: ADDING_FAILURE, error: errorMessage });
    });

    it('should dispatch ADDING_REQUEST and ADDING_FAILURE when response is not ok', async () => {
        // Simula uma resposta com status 404
        axios.post.mockResolvedValueOnce({ status: 404 });

        // Despacha a ação addCliente
        await store.dispatch(addCliente());

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADDING_REQUEST });
        expect(actions[1]).toEqual({ type: ADDING_FAILURE, error: 'Network response was not ok.' });
    });
});
