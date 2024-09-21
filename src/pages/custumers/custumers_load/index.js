import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchData } from '../../../actions/custumers/custumersLoadAction';
import { deleteCliente } from '../../../actions/custumers/custumerDeleteAction';
import CustumerInfoDialog  from './custumer_info_dialog';
import { useNavigation } from '@react-navigation/native';

const CustumersLoad = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error } = useSelector((state) => state.custumers );
    let { list: data } = useSelector((state) => state.custumers );

    const { loadingDelete, errorDelete } = useSelector((state) => state.custumerDelete);

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

    const handleDelete = (idCliente) => {
      dispatch(deleteCliente(idCliente));
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
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Nome: </Text>
              <Text style={{ color: '#555' }}>{item.nome}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Contato: </Text>
              <Text style={{ color: '#555' }}>{item.contato}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Email: </Text>
              <Text style={{ color: '#555' }}>{item.email}</Text>
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => toggleDialog(item)}
            >
              <MaterialIcons name="remove-red-eye" size={24} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('CustumerEdit', { idCliente: item.idCliente })}
            >
              <MaterialIcons name="edit" size={24} color="orange" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDelete(item.idCliente)}
            >
              <MaterialIcons name='delete-outline' size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.idCliente}
            renderItem={renderItem}
          />

          {selectedItem && (
            <CustumerInfoDialog
              isVisible={isDialogVisible}
              onClose={closeDialog}
              title="Informações do Cliente"
              item={selectedItem}
            />
          )}
        </View>
    ); 
};

export default CustumersLoad;