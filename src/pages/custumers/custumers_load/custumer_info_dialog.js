import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';

const CustumerInfoDialog = ({ isVisible, onClose, title, item }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.body}>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Código: </Text>
              <Text style={{ color: '#555' }}>{item.codigo}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Nome: </Text>
              <Text style={{ color: '#555' }}>{item.nome}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>CPF: </Text>
              <Text style={{ color: '#555' }}>{item.cpf}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>RG: </Text>
              <Text style={{ color: '#555' }}>{item.rg}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Data Nascimento: </Text>
              <Text style={{ color: '#555' }}>{moment(item.dataNasc).format('DD/MM/YYYY')}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Contato: </Text>
              <Text style={{ color: '#555' }}>{item.contato}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>E-mail: </Text>
              <Text style={{ color: '#555' }}>{item.email}</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  body: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'teal',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustumerInfoDialog;
