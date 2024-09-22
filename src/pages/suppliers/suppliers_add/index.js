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
} from './styles'

const SupplierAdd = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, close } = useSelector((state) => state.custumerAdd );

    const [codigo, setCodigo] = useState(null);
    const [atividade, setAtividade] = useState(null);
    const [empresa, setEmpresa] = useState(null);
    const [contato, setContato] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [email, setEmail] = useState(null);

    const body = {
        codigo: codigo,
        atividade: atividade,
        empresa: empresa,
        contato: contato,
        endereco: endereco,      
        email: email
    }

    const addingProduto = () => {
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
                        placeholder="Atividade"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={atividade}
                        onChangeText={atividade => setAtividade(atividade)}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Empresa"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={empresa}
                        onChangeText={empresa => setEmpresa(empresa)}
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
                        placeholder="Endereco"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={endereco}
                        onChangeText={endereco => setEndereco(endereco)}
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

export default SupplierAdd;