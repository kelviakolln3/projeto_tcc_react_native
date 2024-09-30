import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, KeyboardAvoidingView, Text, FlatList, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import ConditionPaymentDropdown from './condition_payment';
import FormPaymentDropdown from './form_payment';
import AddItemDialog from './add_item_dialog'
import { fetchData, editPedido, addItemPedido, removeItemPedido } from '../../../actions/orders/orderEditAction';

import {
    Form,
    Input,
    Error,
    Button,
    ButtonText,
    Row,
    LeftAlignedButton,
} from './styles'

const OrderEdit = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { idPedido } = route.params; 

    const { loadingFind, errorFind, loadingEdit, errorEdit, close } = useSelector((state) => state.orderEdit );
    const { order } = useSelector((state) => state.orderEdit );
    let { itensPedido: itensPedido } = useSelector((state) => state.orderEdit);

    const [isDialogVisible, setDialogVisible] = useState(false);

    const [idCliente, setIdCliente] = useState(null);
    const [condicaoPagamento, setCondicaoPagamento] = useState(null);
    const [formaPagamento, setFormaPagamento] = useState(null);
    const [total, setTotal] = useState(0.00);
    const [observacao, setObservacao] = useState(null);
    //Itens do pedido
    const [idProduto, setIdProduto] = useState(null);
    const [quantidade, setQuantidade] = useState(null);
    const [valorUnitario, setValorUnitario] = useState(null);

    const body = {
        idPedido: order?.idPedido || '',
        idCliente: idCliente || order?.idCliente || '',
        idUsuario: order?.idUsuario || '',
        dataCriacao: order?.dataCriacao || '',
        condicaoPagamento: condicaoPagamento || '',
        formaPagamento: formaPagamento || '',
        total: total || '',
        observacao: observacao || '',
        itemPedidoBeans: itensPedido || []
    };

    const itemPedido = {
        idProduto: idProduto,
        quantidade: quantidade,
        valorUnitario: valorUnitario
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

    const addItem = () => {
        if (!idProduto || !quantidade || !valorUnitario) {
            console.log("Preencha todos os campos do item.");
            return;
        }
        dispatch(addItemPedido(itemPedido));
        setDialogVisible(false);
        setIdProduto(null);
        setQuantidade(null);
        setValorUnitario(null);
        calculeTotal();
    };

    const removingItemPedido = (item) => {
        dispatch(removeItemPedido(item));
        calculeTotal();
    };

    const editOrder = () => {
        if (order?.idPedido) {
            dispatch(editPedido(body, order.idPedido));
        }
    };

    useEffect(() => {
        if (order) {
            setIdCliente(order.idCliente?.toString() || '');
            setCondicaoPagamento(order.condicaoPagamento);
            setFormaPagamento(order.formaPagamento);
            setTotal(order.total?.toString() || 0.00);
            setObservacao(order.observacao || '');
        }
    }, [order]);
    
    useEffect(() => {
        if (close) {
            navigation.goBack();
        }

        if (idPedido) {
            dispatch(fetchData(idPedido));
        }
        
    }, [dispatch, close, navigation, idPedido]);

    useEffect(() => {
        calculeTotal();
    }, [itemPedido]);

    

    if (loadingFind) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (errorFind) {
        return <Text>Error: {errorFind}</Text>;
    }

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
                        <ConditionPaymentDropdown initialValue={condicaoPagamento} onValueChange={handleConditionPayment} />
                        <FormPaymentDropdown initialValue={formaPagamento} onValueChange={handleFormPayment} />
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

                    <Button onPress={editOrder}>
                        {loadingEdit ? (<ActivityIndicator size="small" color="#FFF" />) 
                        : (<ButtonText>Editar</ButtonText>)}
                    </Button>
                    {!!errorEdit && <Error>{errorEdit}</Error>}
                </Form>

                {setDialogVisible && (
                    <AddItemDialog
                    isVisible={isDialogVisible}
                    onClose={addItem}
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

export default OrderEdit;
