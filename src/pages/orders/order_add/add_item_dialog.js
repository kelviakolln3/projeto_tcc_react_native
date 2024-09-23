import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';

const AddItemDialog = ({ isVisible, onClose, title, idProduto, setIdProduto, quantidade, setQuantidade, valorUnitario, setValorUnitario }) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
            <View style={styles.modalContent}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.body}>
            <View style={styles.from}>
                    <TextInput 
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Produto"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={idProduto}
                        onChangeText={idProduto => setIdProduto(idProduto)}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Quantidade"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={quantidade}
                        onChangeText={quantidade => setQuantidade(quantidade)}
                        style={styles.input}
                    />
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Valor Unitario"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={valorUnitario}
                        onChangeText={valorUnitario => setValorUnitario(valorUnitario)}
                        style={styles.input}
                    />
            </View>
            </View>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'left',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    body: {
      marginBottom: 20,
    },
    button: {
      backgroundColor: 'teal',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    from: {
        marginTop: 20,
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#009688',
        height: 55,
        width: 250,
        padding: 20,
        marginBottom: 10,
    }
  });

export default AddItemDialog;