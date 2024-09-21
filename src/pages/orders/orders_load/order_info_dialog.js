import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';

const OrderInfoDialog = ({ isVisible, onClose, title, item }) => {

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>
          <Text style={{ fontWeight: 'bold', color: '#009688' }}>Produto: </Text>
          <Text style={{ color: '#555' }}>{item.idProduto}</Text>
      </Text>
      <Text>
          <Text style={{ fontWeight: 'bold', color: '#009688' }}>Quantidade: </Text>
          <Text style={{ color: '#555' }}>{item.quantidade}</Text>
      </Text>
      <Text>
          <Text style={{ fontWeight: 'bold', color: '#009688' }}>Valor Unitário: </Text>
          <Text style={{ color: '#555' }}>{item.valorUnitario}</Text>
      </Text>
    </View>
  );

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.body}>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Cliente: </Text>
              <Text style={{ color: '#555' }}>{item.idCliente}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Criação: </Text>
              <Text style={{ color: '#555' }}>{moment(item.dataCriacao).format('DD/MM/YYYY')}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Condicao Pagamento: </Text>
              <Text style={{ color: '#555' }}>{item.condicaoPagamento}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Forma Pagamento: </Text>
              <Text style={{ color: '#555' }}>{item.formaPagamento}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Data Nascimento: </Text>
              <Text style={{ color: '#555' }}>{moment(item.dataNasc).format('DD/MM/YYYY')}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Total: </Text>
              <Text style={{ color: '#555' }}>{item.total}</Text>
          </Text>
          <Text style={{ fontWeight: 'bold', color: '#009688' }}>Itens Pedido: </Text>
          <FlatList
            data={item.itemPedidoBeans}
            keyExtractor={(item) => item.idItemPedido}
            renderItem={renderItem}
          />
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

export default OrderInfoDialog;
