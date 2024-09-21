import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const ProductInfoDialog = ({ isVisible, onClose, title, item }) => {
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
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Codigo de barras: </Text>
              <Text style={{ color: '#555' }}>{item.codigoBarras}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Estoque: </Text>
              <Text style={{ color: '#555' }}>{item.estoque}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Grupo: </Text>
              <Text style={{ color: '#555' }}>{item.grupo}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Marca: </Text>
              <Text style={{ color: '#555' }}>{item.marca}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Valor Venda: </Text>
              <Text style={{ color: '#555' }}>{item.valorVenda}</Text>
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
    alignItems: 'left',
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

export default ProductInfoDialog;
