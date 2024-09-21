import axios from 'axios';
import { DELETE_REQUEST, DELETE_FAILURE } from './custumerDeleteActionTypes';
import { FETCH_DATA_SUCCESS } from './custumersLoadActionTypes';

export const deleteCliente = (idCliente) => async (dispatch, getState) => {
    dispatch({ type: DELETE_REQUEST });
    try {
      const response = await axios.delete(`http://192.168.0.16:8080/cliente/${idCliente}`);
      if (response.status == 200) {
        const { list: clientes } = getState().custumers

        const updatedClientes = clientes.filter(cliente => cliente.idCliente !== idCliente);
        dispatch({ type: FETCH_DATA_SUCCESS, payload: updatedClientes });
      } else {
          throw new Error('Network response was not ok.');
      }
    } catch (error) {
      dispatch({ type: DELETE_FAILURE, error: true });
    }
  }; 