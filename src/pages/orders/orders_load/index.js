import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { fetchData } from '../../../actions/orders/ordersLoadAction';

const OrdersLoad = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.orders );
    let { list: data } = useSelector((state) => state.orders);

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
              onPress={() =>
                Alert.alert('Order Info', 'Show customer details here', [
                  { text: 'OK' }
                ])
              }
            >
              <MaterialIcons name="remove-red-eye" size={24} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('CustumerEdit', { idCliente: viewModel.idPedido })}
            >
              <MaterialIcons name="edit" size={24} color="orange" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => presenter.delete(viewModel.idPedido)}
            >
              <MaterialIcons name="delete-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
    );

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.idPedido}
            renderItem={renderItem}
        />
    ); 
};
export default OrdersLoad;