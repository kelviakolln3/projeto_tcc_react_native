import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import { fetchData } from '../../../src/actions/products/productsLoadAction'; 
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../../../src/actions/products/productsLoadActionTypes';
import { faker } from '@faker-js/faker';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('fetchData actions', () => { //Tempo de montagem 04 min e 35 seg 
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
            idProduto: faker.number.int(),
            codigo: faker.number.int(),
            nome: faker.string.alpha(25),
            codigoBarras: faker.number.int({max: 14}).toString(),
            estoque: faker.number.float(),
            grupo: faker.string.alpha(20),
            marca: faker.string.alpha(20),
            valorVenda: faker.number.float(),
        },
        {
            idProduto: faker.number.int(),
            codigo: faker.number.int(),
            nome: faker.string.alpha(25),
            codigoBarras: faker.number.int({max: 14}).toString(),
            estoque: faker.number.float(),
            grupo: faker.string.alpha(20),
            marca: faker.string.alpha(20),
            valorVenda: faker.number.float(),
        },
    ];

    const fakeUrl = 'http://fakeurl.com/api/produto';
    
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