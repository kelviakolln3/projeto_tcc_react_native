import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, KeyboardAvoidingView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchData, editFornecedor } from '../../../actions/suppliers/supplierEditAction';

import {
    Form,
    Input,
    Error,
    Button,
    ButtonText,
    inputStyle,
} from './styles'

const SupplierEdit = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { idFornecedor } = route.params; 

    const { loadingFind, errorFind, loadingEdit, errorEdit, close } = useSelector((state) => state.supplierEdit );
    const { supplier } = useSelector((state) => state.supplierEdit );

    const [atividade, setAtividade] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [contato, setContato] = useState('');
    const [endereco, setEndereco] = useState('');
    const [email, setEmail] = useState('');
    
    const body = {
        idFornecedor: supplier?.idFornecedor || '',
        codigo: supplier?.codigo || '',
        atividade: atividade || '',
        empresa: empresa || '',
        contato: contato || '',
        endereco: endereco || '',
        email: email || ''
    };

    const editSuppler = () => {
        if (!atividade || !empresa || !contato || !endereco || !email) {
            console.log('Preencha todos os campos obrigatórios');
            return;
        }

        if (supplier?.idFornecedor) {
            dispatch(editFornecedor(body, supplier.idFornecedor));
        }
    };

    useEffect(() => {
        if (close) {
            navigation.goBack();
        }
        if (idFornecedor) {
            dispatch(fetchData(idFornecedor));
        }
    }, [dispatch, close, navigation, idFornecedor]);

    useEffect(() => {
        if (supplier) {
            setAtividade(supplier.atividade || '');
            setEmpresa(supplier.empresa || '');
            setContato(supplier.contato || '');
            setEndereco(supplier.endereco || '');
            setEmail(supplier.email || '');
        }
    }, [supplier]);

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
                        placeholder="Atividade"
                        value={atividade}
                        onChangeText={setAtividade}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Empresa"
                        value={empresa}
                        onChangeText={setEmpresa}
                    />
                    <TextInputMask
                        type={'cel-phone'}
                        options={{
                          maskType: 'BRL', 
                          withDDD: true,
                        }}
                        placeholder="Contato"
                        value={contato}
                        onChangeText={setContato}
                        keyboardType="numeric"
                        style={inputStyle}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Endereço"
                        value={endereco}Endereco
                        onChangeText={setEndereco}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <Button onPress={editSuppler}>
                        {loadingEdit ? (<ActivityIndicator size="small" color="#FFF" />) 
                        : (<ButtonText>Editar</ButtonText>)}
                    </Button>
                    {!!errorEdit && <Error>{errorEdit}</Error>}
                </Form>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SupplierEdit;
