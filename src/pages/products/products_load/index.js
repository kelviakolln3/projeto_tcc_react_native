import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchData } from '../../../actions/products/productsLoadAction';
import ProductInfoDialog  from './product_info_dialog';
import { useNavigation } from '@react-navigation/native';

const ProductsLoad = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.products );
    let { list: data } = useSelector((state) => state.products);

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
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Código de barras: </Text>
              <Text style={{ color: '#555' }}>{item.codigoBarras}</Text>
          </Text>
          <Text>
              <Text style={{ fontWeight: 'bold', color: '#009688' }}>Estoque: </Text>
              <Text style={{ color: '#555' }}>{item.estoque}</Text>
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => toggleDialog(item)}
            >
              <MaterialIcons name="remove-red-eye" size={24} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ProductEdit', { idProduto: viewModel.idProduto })}
            >
              <MaterialIcons name="edit" size={24} color="orange" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => presenter.delete(viewModel.idProduto)}
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
            keyExtractor={(item) => item.idProduto}
            renderItem={renderItem}
          />

          {selectedItem && (
            <ProductInfoDialog
              isVisible={isDialogVisible}
              onClose={closeDialog}
              title="Informações do Produto"
              item={selectedItem}
            />
          )}
        </View>
    ); 
};

export default ProductsLoad;