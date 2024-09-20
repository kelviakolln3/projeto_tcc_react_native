/* import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../actions/custumersLoadAction';
import { Container } from './styles';

const CustumerLoad = () => {
    /* const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.custumers || { loading: false, error: null });
    let { list: data } = useSelector((state) => state.custumers || { list: [] });
    list = '[{"codigo": 1, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln19@hotmail.com", "endereco": "testetestei 323", "idCliente": 52, "nome": "Kelvia Kolln", "rg": "123456789"}, {"codigo": 2, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln@gmail.com", "endereco": "Guapore 1114 d - Presidente Medici", "idCliente": 10, "nome": "Kelvia Kf", "rg": "123456789"}]';
    console.log(list);

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
                data={list}
                keyExtractor={(item) => item.codigo}
                renderItem={renderItem}
            />
        </View>
    ); 
};

/* const pessoas = [
    [{"codigo": 1, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln19@hotmail.com", "endereco": "testetestei 323", "idCliente": 52, "nome": "Kelvia Kolln", "rg": "123456789"}, {"codigo": 2, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln@gmail.com", "endereco": "Guapore 1114 d - Presidente Medici", "idCliente": 10, "nome": "Kelvia Kf", "rg": "123456789"}],
    { id: '1', nome: 'João Silva', cpf: '123.456.789-00' },
    { id: '2', nome: 'Maria Souza', cpf: '987.654.321-00' },
    { id: '3', nome: 'Carlos Pereira', cpf: '456.789.123-00' },
    // Adicione mais pessoas
  ];
  
  const ItemPessoa = ({ nome, cpf }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{nome}</Text>
      <Text>{cpf}</Text>
    </View>
  );
  
  const ListaPessoas = () => {
    return (
      <FlatList
        data={pessoas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemPessoa nome={item.nome} cpf={item.cpf} />}
      />
    );
  };

export default ListaPessoas; */ 

/*import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../actions/custumersLoadAction';
import { Container } from './styles';

const CustumerLoad = () => {
    const dispatch = useDispatch();
    
    // Combinações de estado usando um único useSelector
    //const { loading, error, list: data } = useSelector((state) => state.custumers || { loading: false, error: null, list: [] });
    let { list: data } = useSelector((state) => state.custumers || { list: [] });
    list = '[{"codigo": 1, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln19@hotmail.com", "endereco": "testetestei 323", "idCliente": 52, "nome": "Kelvia Kolln", "rg": "123456789"}, {"codigo": 2, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln@gmail.com", "endereco": "Guapore 1114 d - Presidente Medici", "idCliente": 10, "nome": "Kelvia Kf", "rg": "123456789"}]';
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    /* if (loading) {
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
        <Container>
            <Text>Clientes</Text>
            <FlatList
                data={list}
                keyExtractor={(item) => item.idCliente?.toString() || item.codigo?.toString()} 
                renderItem={renderItem}
            />
        </Container>
    );
};

export default CustumerLoad; */

import React from 'react';
import { FlatList, Text, View } from 'react-native';

const pessoas = //[
  //{ "codigo": 1, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln19@hotmail.com", "endereco": "testetestei 323", "idCliente": 52, "nome": "Kelvia Kolln", "rg": "123456789" },
  //{ "codigo": 2, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln@gmail.com", "endereco": "Guapore 1114 d - Presidente Medici", "idCliente": 10, "nome": "Kelvia Kf", "rg": "123456789" }
  [{"codigo": 1, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln19@hotmail.com", "endereco": "testetestei 323", "idCliente": 52, "nome": "Kelvia Kolln", "rg": "123456789"}, {"codigo": 2, "contato": "(49) 999971126", "cpf": "071.044.619-57", "dataNasc": "2001-02-12T00:00:00.000+00:00", "email": "kelviakolln@gmail.com", "endereco": "Guapore 1114 d - Presidente Medici", "idCliente": 10, "nome": "Kelvia Kf", "rg": "123456789"}];
//];

const ItemPessoa = ({ nome, cpf }) => (
  <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{nome}</Text>
    <Text>{cpf}</Text>
  </View>
);

const ListaPessoas = () => {
  return (
    <FlatList
      data={pessoas}
      keyExtractor={(item) => item.idCliente.toString()}  // Alterado para usar idCliente como chave
      renderItem={({ item }) => <ItemPessoa nome={item.nome} cpf={item.cpf} />}
    />
  );
};

export default ListaPessoas;