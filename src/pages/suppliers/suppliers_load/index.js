import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchData } from '../../../actions/suppliers/suppliersLoadAction';
import { deleteFornecedor } from '../../../actions/suppliers/supplierDeleteAction';
import SupplerInfoDialog  from './supplier_info_dialog';

const SuppliersLoad = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.suppliers );
    let { list: data } = useSelector((state) => state.suppliers);

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

    const handleDelete = (idFornecedor) => {
      dispatch(deleteFornecedor(idFornecedor));
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
              onPress={() => toggleDialog(item)}
            >
              <MaterialIcons name="remove-red-eye" size={24} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ProductEdit', { idFornecedor: viewModel.idFornecedor })}
            >
              <MaterialIcons name="edit" size={24} color="orange" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDelete(item.idFornecedor)}
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
            keyExtractor={(item) => item.idFornecedor}
            renderItem={renderItem}
          />

          {selectedItem && (
            <SupplerInfoDialog
              isVisible={isDialogVisible}
              onClose={closeDialog}
              title="Informações do Fornecedor"
              item={selectedItem}
            />
          )}
        </View>
    ); 
};

export default SuppliersLoad;