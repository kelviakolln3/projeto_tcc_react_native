import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, KeyboardAvoidingView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchData, editProduto } from '../../../actions/products/productEditAction';

import {
    Form,
    Input,
    Error,
    Button,
    ButtonText,
} from './styles'

const ProductEdit = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { idProduto } = route.params; 

    const { loadingFind, errorFind, loadingEdit, errorEdit, close } = useSelector((state) => state.productEdit );
    const { product } = useSelector((state) => state.productEdit );

    const [nome, setNome] = useState('');
    const [codigoBarras, setCodigoBarras] = useState('');
    const [estoque, setEstoque] = useState('0.00');
    const [grupo, setGrupo] = useState('');
    const [marca, setMarca] = useState('');
    const [valorVenda, setValorVenda] = useState('0.00');
    
    const body = {
        idProduto: product?.idProduto || '',
        codigo: product?.codigo || '',
        nome: nome || '',
        codigoBarras: codigoBarras || '',
        estoque: estoque || 0.00,
        grupo: grupo || '',
        marca: marca || '',
        valorVenda: valorVenda || 0.00
    };

    const editProduct = () => {
        if (!nome || !codigoBarras || !estoque || !grupo || !marca || !valorVenda) {
            console.log('Preencha todos os campos obrigatórios');
            return;
        }

        if (product?.idProduto) {
            dispatch(editProduto(body, product.idProduto));
        }
    };

    useEffect(() => {
        if (close) {
            navigation.goBack();
        }
        if (idProduto) {
            dispatch(fetchData(idProduto));
        }
    }, [dispatch, close, navigation, idProduto]);

    useEffect(() => {
        if (product) {
            setNome(product.nome || '');
            setCodigoBarras(product.codigoBarras || '');
            setEstoque(product.estoque?.toString() || '0.00');
            setGrupo(product.grupo || '');
            setMarca(product.marca || '');
            setValorVenda(product.valorVenda?.toString() || '0.00');
        }
    }, [product]);

    if (loadingFind) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (errorFind) {
        return <Text>Error: {errorFind}</Text>;
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <View>
                <Form>
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Codigo de Barras"
                        value={codigoBarras}
                        onChangeText={setValorVenda}
                        keyboardType="number"
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Estoque"
                        value={estoque}
                        onChangeText={setEstoque}
                        keyboardType="number"
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Grupo"
                        value={grupo}
                        onChangeText={setGrupo}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Marca"
                        value={marca}
                        onChangeText={setMarca}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Valor Venda"
                        value={valorVenda}
                        onChangeText={setValorVenda}
                        keyboardType="number"
                    />

                    <Button onPress={editProduct}>
                        {loadingEdit ? (<ActivityIndicator size="small" color="#FFF" />) 
                        : (<ButtonText>Editar</ButtonText>)}
                    </Button>
                    {!!errorEdit && <Error>{errorEdit}</Error>}
                </Form>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ProductEdit;
