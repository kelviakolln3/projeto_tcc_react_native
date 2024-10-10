import axios from 'axios';
import { FIND_REQUEST, FIND_SUCCESS, FIND_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE } from './custumerEditActionTypes';
import { FETCH_DATA_SUCCESS } from './custumersLoadActionTypes'

export const fetchData = (idCliente) => async (dispatch) => {
    dispatch({ type: FIND_REQUEST });
    try {
      const response = await axios.get(`http://192.168.0.15:8080/cliente/${idCliente}`);
      if (response.status == 200) {
          const data = await response['data'];
          dispatch({ type: FIND_SUCCESS, payload: data });
      } else {
          throw new Error('Network response was not ok.');
      }
    } catch (error) {
      dispatch({ type: FIND_FAILURE, error: error.message });
    }
  };

export const editCliente = (body, idCliente) => async (dispatch, getState) => {
    dispatch({ type: EDIT_REQUEST });
    
    try {
        const response = await axios.put(`http://192.168.0.15:8080/cliente/${idCliente}`, body);
        if (response.status == 200) {
            const { list: clientes } = getState().custumers
            const updatedClientes = clientes.map(cliente => cliente.idCliente === idCliente ? response.data : cliente);
            dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedClientes });
            dispatch({ type: EDIT_SUCCESS});
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        dispatch({ type: EDIT_FAILURE, error: error.message });
    }
};