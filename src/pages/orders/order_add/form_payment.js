import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Dinheiro', value: 'Dinheiro' },
  { label: 'Cartao', value: 'Cartao' },
  { label: 'Boleto', value: 'Boleto' },
  { label: 'Pix', value: 'Pix' },
];

const FormPaymentDropdown = ({onValueChange}) => {
  const [value, setValue] = useState(data[0]);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Selecione a forma de pagamento"
      value={value}
      onChange={item => {
        setValue(item.value);
        onValueChange(item.value);
      }}
    />
  );
};

export default FormPaymentDropdown;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: 170,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    padding: '0px 20px',
  },
  icon: {
    marginRight: 5,
    color: '#009688'
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#009688'
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#009688'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#009688',
  },
});