import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, KeyboardAvoidingView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchData, editCliente } from '../../../actions/custumers/custumerEditAction';

import {
    Form,
    Input,
    Error,
    Button,
    ButtonText,
    inputStyle,
} from './styles'

const CustumerEdit = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { idCliente } = route.params; 

    const { loadingFind, errorFind, loadingEdit, errorEdit, close } = useSelector((state) => state.custumerEdit );
    const { custumer } = useSelector((state) => state.custumerEdit );

    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [contato, setContato] = useState('');
    const [email, setEmail] = useState('');

    function convertDate(dateStr) {
        if (!dateStr) return null;
    
        const isIsoFormat = dateStr.includes('-');
        
        if (isIsoFormat) {
            return dateStr;
        }
        
        const [day, month, year] = dateStr.split('/');
        if (day && month && year) {
            return `${year}-${month}-${day}`;
        }
        
        return null;
    }
    

    const body = {
        idCliente: custumer?.idCliente || '',
        codigo: custumer?.codigo || '',
        nome: nome || '',
        cpf: custumer?.cpf || '',
        rg: custumer?.rg || '',
        endereco: endereco || '',
        dataNasc: convertDate(dataNasc) || custumer?.dataNasc || '',
        contato: contato || '',
        email: email || ''
    };

    const editCustumer = () => {
        if (!nome || !endereco || !contato || !email) {
            console.log('Preencha todos os campos obrigatórios');
            return;
        }

        if (custumer?.idCliente) {
            dispatch(editCliente(body, custumer.idCliente));
        }
    };

    useEffect(() => {
        if (close) {
            navigation.goBack();
        }
        if (idCliente) {
            dispatch(fetchData(idCliente));
        }
    }, [dispatch, close, navigation, idCliente]);

    useEffect(() => {
        if (custumer) {
            setNome(custumer.nome || '');
            setEndereco(custumer.endereco || '');
            setDataNasc(custumer.dataNasc || '');
            setContato(custumer.contato || '');
            setEmail(custumer.email || '');
        }
    }, [custumer]);

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
                        placeholder="Endereco"
                        value={endereco}
                        onChangeText={setEndereco}
                    />
                    <TextInputMask
                        type={'datetime'}
                        options={{ format: 'DD/MM/YYYY' }}
                        value={dataNasc}
                        onChangeText={setDataNasc}
                        placeholder='Data Nascimento'
                        style={inputStyle}
                        keyboardType="numeric"
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
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <Button onPress={editCustumer}>
                        {loadingEdit ? (<ActivityIndicator size="small" color="#FFF" />) 
                        : (<ButtonText>Editar</ButtonText>)}
                    </Button>
                    {!!errorEdit && <Error>{errorEdit}</Error>}
                </Form>
            </View>
        </KeyboardAvoidingView>
    );
};

export default CustumerEdit;
