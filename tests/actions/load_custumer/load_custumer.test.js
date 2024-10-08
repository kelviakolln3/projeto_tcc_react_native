import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { fetchData } from '../../../src/actions/custumers/custumersLoadAction'; 
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../../../src/actions/custumers/custumersLoadActionTypes';
import { faker } from '@faker-js/faker';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('fetchData actions', () => { //Tempo de montagem 1 h 22 min e 57 seg 
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('should dispatch FETCH_DATA_REQUEST and FETCH_DATA_SUCCESS when fetching data is successful', async () => {
    const mockData = [
        {
            idCliente: faker.number.int(),
            codigo: faker.number.int(),
            nome: faker.person.fullName(),
            cpf: faker.string.alpha(14),
            rg: faker.number.int({max: 1000}).toString(),
            endereco: faker.location.streetAddress(),
            dataNasc: faker.date.past().toISOString(),
            contato: faker.phone.number(),
            email: faker.internet.email(),
        },
        {
            idCliente: faker.number.int(),
            codigo: faker.number.int(),
            nome: faker.person.fullName(),
            cpf: faker.string.alpha(14),
            rg: faker.number.int({max: 1000}).toString(),
            endereco: faker.location.streetAddress(),
            dataNasc: faker.date.past().toISOString(),
            contato: faker.phone.number(),
            email: faker.internet.email(),
        },
    ];

    const fakeUrl = 'http://fakeurl.com/api/clientes';
    
    // Simula uma resposta bem-sucedida
    axios.get.mockResolvedValueOnce({ status: 200, data: mockData });

    // Despacha a ação fetchData
    await store.dispatch(fetchData(fakeUrl));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: FETCH_DATA_REQUEST });
    expect(actions[1]).toEqual({ type: FETCH_DATA_SUCCESS, payload: mockData });
  });

  it('should dispatch FETCH_DATA_REQUEST and FETCH_DATA_FAILURE when fetching data fails', async () => {
    const errorMessage = 'Network error';

    // Simula um erro na requisição
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    // Despacha a ação fetchData
    await store.dispatch(fetchData());

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: FETCH_DATA_REQUEST });
    expect(actions[1]).toEqual({ type: FETCH_DATA_FAILURE, error: errorMessage });
  });

  it('should dispatch FETCH_DATA_REQUEST and FETCH_DATA_FAILURE when response is not ok', async () => {
    // Simula uma resposta com status 404
    axios.get.mockResolvedValueOnce({ status: 404 });

    // Despacha a ação fetchData
    await store.dispatch(fetchData());

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: FETCH_DATA_REQUEST });
    expect(actions[1]).toEqual({ type: FETCH_DATA_FAILURE, error: 'Network response was not ok.' });
  });
});