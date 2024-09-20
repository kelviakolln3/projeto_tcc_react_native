import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchData } from '../../../actions/suppliers/suppliersLoadAction';

const SuppliersLoad = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.suppliers );
    let { list: data } = useSelector((state) => state.suppliers);

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
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Empresa: </Text>
              <Text style={{ color: '#555' }}>{item.empresa}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Endereço: </Text>
              <Text style={{ color: '#555' }}>{item.endereco}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Contato: </Text>
              <Text style={{ color: '#555' }}>{item.contato}</Text>
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Supplier Info', 'Show customer details here', [
                  { text: 'OK' }
                ])
              }
            >
              <MaterialIcons name="remove-red-eye" size={24} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ProductEdit', { idFornecedor: viewModel.idFornecedor })}
            >
              <MaterialIcons name="edit" size={24} color="orange" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => presenter.delete(viewModel.idFornecedor)}
            >
              <MaterialIcons name="delete-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
    );

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.idFornecedor}
            renderItem={renderItem}
        />
    ); 
};

export default SuppliersLoad;