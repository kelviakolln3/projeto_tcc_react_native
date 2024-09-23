import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View, KeyboardAvoidingView, Text, FlatList, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addPedido, addItemPedido, removeItemPedido } from '../../../actions/orders/orderAddAction';
import { useNavigation } from '@react-navigation/native';
import ConditionPaymentDropdown from './condition_payment';
import FormPaymentDropdown from './form_payment';
import AddItemDialog from './add_item_dialog'
import moment from 'moment';

import {
    Form,
    Input,
    Error,
    Button,
    ButtonText,
    Row,
    LeftAlignedButton,
} from './styles'

const OrderAdd = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, close } = useSelector((state) => state.orderAdd );
    let { itensPedido: itensPedido } = useSelector((state) => state.orderAdd);
    
    const [isDialogVisible, setDialogVisible] = useState(false);
    
    const [idCliente, setIdCliente] = useState(null);
    const [dataCriacao, setDataCriacao] = useState(null);
    const [condicaoPagamento, setCondicaoPagamento] = useState(null);
    const [formaPagamento, setFormaPagamento] = useState(null);
    const [total, setTotal] = useState(0.00);
    const [observacao, setObservacao] = useState(null);
    //Itens do pedido
    const [idProduto, setIdProduto] = useState(null);
    const [quantidade, setQuantidade] = useState(null);
    const [valorUnitario, setValorUnitario] = useState(null);

    function convertDate(dateStr) {
        if(dateStr){
            const [day, month, year] = dateStr.split('/');
            return `${year}-${month}-${day}`;
        }
    }

    const toggleDialog = () => {
        setDialogVisible(true);
    };

    const handleConditionPayment = (newValue) => {
        setCondicaoPagamento(newValue);
    };

    const handleFormPayment = (newValue) => {
        setFormaPagamento(newValue);
    };
    
    const calculeTotal = () => {
        let new_total = 0;
        for (let index = 0; index < itensPedido.length; index++) {
            new_total += (itensPedido[index].quantidade * itensPedido[index].valorUnitario);
        }
        setTotal(new_total)
    }

    const body = {
        idCliente: idCliente,
        idUsuario: 1,
        dataCriacao:  moment().utcOffset('+03:00').format('YYYY-MM-DD'),
        condicaoPagamento: condicaoPagamento,
        formaPagamento: formaPagamento,
        total: total,
        observacao: observacao,
        itemPedidoBeans: itensPedido
    }

    const itemPedido = {
        idProduto: idProduto,
        quantidade: quantidade,
        valorUnitario: valorUnitario
    }

    const addingPedido = () => {
        dispatch(addPedido(body));
    };

    const addingItemPedido = () => {
        dispatch(addItemPedido(itemPedido));
        setDialogVisible(false);
        calculeTotal()
    }

    const removingItemPedido = () => {
        dispatch(removeItemPedido(itemPedido));
        calculeTotal()
    }

    useEffect(() => {
        if (close) {
            navigation.goBack();
        }
        calculeTotal();
    }, [close, navigation, itemPedido]);

    const renderItem = ({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>
                <Text style={{ fontWeight: 'bold', color: '#009688' }}>Produto: </Text>
                <Text style={{ color: '#555' }}>{item.idProduto}</Text>
            </Text>
            <Text>
                <Text style={{ fontWeight: 'bold', color: '#009688' }}>Quantidade: </Text>
                <Text style={{ color: '#555' }}>{item.quantidade}</Text>
            </Text>
            <Text>
                <Text style={{ fontWeight: 'bold', color: '#009688' }}>Valor Unitario: </Text>
                <Text style={{ color: '#555' }}>{item.valorUnitario}</Text>
            </Text>
            <TouchableOpacity
                onPress={() => removingItemPedido(item)}
            >
                <MaterialIcons name="delete-outline" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <View>
                <Form>
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Cliente"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={idCliente}
                        onChangeText={idCliente => setIdCliente(idCliente)}
                        keyboardType="numeric"
                    />
                    <View style={Row}>
                        <ConditionPaymentDropdown onValueChange={handleConditionPayment} />
                        <FormPaymentDropdown onValueChange={handleFormPayment} />
                    </View>
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Observação"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={observacao}
                        onChangeText={observacao => setObservacao(observacao)}
                    />
                    <Text style={LeftAlignedButton}>
                        <Text style={{ fontWeight: 'bold', color: '#009688' }}>Total: </Text>
                        <Text style={{ color: '#555' }}>{total}</Text>
                    </Text>

                    <FlatList
                        data={itensPedido}
                        keyExtractor={(item) => item.idProduto}
                        renderItem={renderItem}
                        style={LeftAlignedButton}
                    />

                    <View style={LeftAlignedButton}>
                        <TouchableOpacity
                            onPress={() => toggleDialog()}
                            >
                            <MaterialIcons name="add" size={24} color="#009688" />
                        </TouchableOpacity>
                    </View>

                    <Button onPress={() => addingPedido()}>
                        {loading ? (<ActivityIndicator size="small" color="#FFF" />) 
                        : (<ButtonText>Salvar</ButtonText>)}
                    </Button>
                    {!!error && <Error>{error}</Error>}
                </Form>

                {setDialogVisible && (
                    <AddItemDialog
                    isVisible={isDialogVisible}
                    onClose={addingItemPedido}
                    title="Adicionar Item"
                    idProduto={idProduto}
                    setIdProduto={setIdProduto}
                    quantidade={quantidade}
                    setQuantidade={setQuantidade}
                    valorUnitario={valorUnitario}
                    setValorUnitario={setValorUnitario}
                    />
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

export default OrderAdd;