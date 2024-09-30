import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { fetchData } from '../../../actions/orders/ordersLoadAction';
import { deletePedido } from '../../../actions/orders/orderDeleteAction';
import OrderInfoDialog  from './order_info_dialog';
import { useNavigation } from '@react-navigation/native';

const OrdersLoad = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error } = useSelector((state) => state.orders );
    let { list: data } = useSelector((state) => state.orders);

    const [selectedItem, setSelectedItem] = useState(null);
    const [isDialogVisible, setDialogVisible] = useState(false);

    const toggleDialog = (item) => {
      setSelectedItem(item);
      setDialogVisible(true);
    };

    const closeDialog = () => {
      setSelectedItem(null);
      setDialogVisible(false);
    };

    const handleDelete = (idPedido, itemPedidoList) => {
      dispatch(deletePedido(idPedido, itemPedidoList));
    };

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    const renderItem = ({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Data Criação: </Text>
              <Text style={{ color: '#555' }}>{moment(item.dataCriacao).format('DD/MM/YYYY')}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Total: </Text>
              <Text style={{ color: '#555' }}>{item.total}</Text>
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => toggleDialog(item)}
            >
              <MaterialIcons name="remove-red-eye" size={24} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('OrderEdit', { idPedido: item.idPedido })}
            >
              <MaterialIcons name="edit" size={24} color="orange" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDelete(item.idPedido, item.itemPedidoBeans)}
            >
              <MaterialIcons name="delete-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.idPedido}
            renderItem={renderItem}
          />

          {selectedItem && (
            <OrderInfoDialog
              isVisible={isDialogVisible}
              onClose={closeDialog}
              title="Informações do Pedido"
              item={selectedItem}
            />
          )}

          <FAB
            icon="plus"
            color='#FFF'
            style={styles.fab}
            onPress={() => navigation.navigate('OrderAdd')}
          />
        </View>
    ); 
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#009688'
  },
})

export default OrdersLoad;