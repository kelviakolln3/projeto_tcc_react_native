import axios from 'axios';
import { mockCreateCustumer, mockCreateOrder, mockCreateProduct, mockCreateSupplier } from '../mocks/params_factory'; // Fábrica de dados para testes

describe('Multiple Requests Test', () => { //Tempo de montagem 20 min e 31 seg 
  let requests = [];

  beforeEach(() => {
    requests = [];

    const loadCustumers = () => axios.get('http://192.168.0.15:8080/cliente');
    const createCustumer = (params) => axios.post('http://192.168.0.15:8080/cliente', params);

    const loadOrders = () => axios.get('http://192.168.0.15:8080/pedido/get-all-bean');
    const createOrder = (params) => axios.post('http://192.168.0.15:8080/pedido/inserir-pedido', params);

    const loadProducts = () => axios.get('http://192.168.0.15:8080/produto');
    const createProduct = (params) => axios.post('http://192.168.0.15:8080/produto', params);

    const loadSuppliers = () => axios.get('http://192.168.0.15:8080/fornecedor');
    const createSupplier = (params) => axios.post('http://192.168.0.15:8080/fornecedor', params);

    for (let i = 0; i < 20; i++) {
      requests.push(createCustumer(mockCreateCustumer()));
      requests.push(loadCustumers());
      requests.push(createOrder(mockCreateOrder()));
      requests.push(loadOrders());
      requests.push(createProduct(mockCreateProduct()));
      requests.push(loadProducts());
      requests.push(createSupplier(mockCreateSupplier()));
      requests.push(loadSuppliers());
    }
  });

  test('Should call Multiple Requests with success', async () => {
    try {
        console.log(`Number of requests: ${requests.length}`);
        await Promise.all(requests);
        console.log('All requests completed successfully.');
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to complete all requests');
    }
  });
});
