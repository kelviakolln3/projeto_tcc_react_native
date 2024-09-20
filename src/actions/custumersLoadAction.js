import axios from 'axios';
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './custumerLoadActionTypes';

export const fetchData = () => async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    try {
      //const response = await axios.get('http://192.168.30.126:8080/cliente');
      //console.log(response['data'])
      let response = [{"codigo": 1, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln19@hotmail.com", "endereco": "testetestei 323", "idCliente": 52, "nome": "Kelvia Kolln", "rg": "123456789"}, {"codigo": 1, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln@gmail.com", "endereco": "Guapore 1114 d - Presidente Medici", "idCliente": 10, "nome": "Kelvia Kf", "rg": "123456789"}];
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response });
      /* if (response.status == 200) {
          const data = await response['data'];
          dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
      } else {
          throw new Error('Network response was not ok.');
      } */
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, error: error.message });
    }
  };
