import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View, KeyboardAvoidingView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { addCliente } from '../../../actions/custumers/custumerAddAction';
import { useNavigation } from '@react-navigation/native';

import {
    Form,
    Input,
    Error,
    Button,
    ButtonText,
    inputStyle,
} from './style'

const CustumerAdd = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, close } = useSelector((state) => state.custumerAdd );

    const [codigo, setCodigo] = useState(null);
    const [nome, setNome] = useState(null);
    const [cpf, setCpf] = useState(null);
    const [rg, setRg] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [dataNasc, setDataNasc] = useState(null);
    const [contato, setContato] = useState(null);
    const [email, setEmail] = useState(null);

    function convertDate(dateStr) {
        if(dateStr){
            const [day, month, year] = dateStr.split('/');
            return `${year}-${month}-${day}`;
        }
    }

    const body = {
        codigo: codigo,
        nome: nome,
        cpf: cpf,
        rg: rg,
        endereco: endereco,
        dataNasc: convertDate(dataNasc),
        contato: contato,
        email: email
    }

    const addingCliente = () => {
        dispatch(addCliente(body));
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
                    <TextInputMask
                        type={'cpf'}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="CPF"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={cpf}
                        onChangeText={cpf => setCpf(cpf)}
                        keyboardType="numeric"
                        style={inputStyle}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="RG"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={rg}
                        onChangeText={rg => setRg(rg)}
                        keyboardType="numeric"
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Endereco"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={endereco}
                        onChangeText={endereco => setEndereco(endereco)}
                    />
                    <TextInputMask
                        type={'datetime'}
                        options={{format: 'DD/MM/YYYY',}}
                        value={dataNasc}
                        onChangeText={dataNasc => setDataNasc(dataNasc)}
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
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Contato"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={contato}
                        onChangeText={contato => setContato(contato)}
                        keyboardType="numeric"
                        style={inputStyle}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="E-mail"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        keyboardType="email"
                    />

                    <Button onPress={() => addingCliente()}>
                        {loading ? (<ActivityIndicator size="small" color="#FFF" />) 
                        : (<ButtonText>Entrar</ButtonText>)}
                    </Button>
                    {!!error && <Error>{error}</Error>}
                </Form>
            </View>
        </KeyboardAvoidingView>
    );
};

export default CustumerAdd;