import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../actions/custumersLoadAction';
import { Container } from './styles';

const CustumerLoad = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.custumers || { loading: false, error: null });
    const { list: data } = useSelector((state) => state.custumers || { list: [] });

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
            <Text>Código: {item.codigo}</Text>
            <Text>Nome: {item.nome}</Text>
            <Text>Contato: {item.contato}</Text>
            <Text>CPF: {item.cpf}</Text>
            <Text>Data de Nascimento: {new Date(item.dataNasc).toLocaleDateString()}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Endereço: {item.endereco}</Text>
            <Text>RG: {item.rg}</Text>
        </View>
    );

    return (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>Clientes</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.idCliente.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default CustumerLoad;