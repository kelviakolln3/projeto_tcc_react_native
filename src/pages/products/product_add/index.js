import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View, KeyboardAvoidingView } from 'react-native';
import { addProduto} from '../../../actions/products/productAddAction';
import { useNavigation } from '@react-navigation/native';

import {
    Form,
    Input,
    Error,
    Button,
    ButtonText,
} from './styles'

const ProductAdd = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, close } = useSelector((state) => state.productAdd );

    const [codigo, setCodigo] = useState(null);
    const [nome, setNome] = useState(null);
    const [codigoBarras, setCodigoBarras] = useState(null);
    const [estoque, setEstoque] = useState(null);
    const [grupo, setGrupo] = useState(null);
    const [marca, setMarca] = useState(null);
    const [valorVenda, setValorVenda] = useState(null);


    const body = {
        codigo: codigo,
        nome: nome,
        codigoBarras: codigoBarras,
        estoque: estoque,
        grupo: grupo,
        marca: marca,
        valorVenda: valorVenda,
    }

    const addingProduto = () => {
        dispatch(addProduto(body));
    };

    useEffect(() => {
        if (close) {
            navigation.goBack();
        }
    }, [close, navigation]);

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <View>
                <Form>
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Código"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={codigo}
                        onChangeText={codigo => setCodigo(codigo)}
                        keyboardType="numeric"
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Nome"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={nome}
                        onChangeText={nome => setNome(nome)}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Codigo de Barras"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={codigoBarras}
                        onChangeText={codigoBarras => setCodigoBarras(codigoBarras)}
                        keyboardType="numeric"
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Estoque"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={estoque}
                        onChangeText={estoque => setEstoque(estoque)}
                        keyboardType="numeric"
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Grupo"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={grupo}
                        onChangeText={grupo => setGrupo(grupo)}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Marca"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={marca}
                        onChangeText={marca => setMarca(marca)}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Valor Venda"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={valorVenda}
                        onChangeText={valorVenda => setValorVenda(valorVenda)}
                        keyboardType="numeric"
                    />

                    <Button onPress={() => addingProduto()}>
                        {loading ? (<ActivityIndicator size="small" color="#FFF" />) 
                        : (<ButtonText>Salvar</ButtonText>)}
                    </Button>
                    {!!error && <Error>{error}</Error>}
                </Form>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ProductAdd;