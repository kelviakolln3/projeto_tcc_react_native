import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialIcons name="pallet" size={22} color="teal" />
        <Text style={styles.text}>Produtos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProductsLoad')}>
          <MaterialIcons name="chevron-right" size={32} color="teal" />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <MaterialIcons name="person" size={22} color="teal" />
        <Text style={styles.text}>Clientes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CustumerLoad')}>
          <MaterialIcons name="chevron-right" size={32} color="teal" />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <MaterialIcons name="forklift" size={22} color="teal" />
        <Text style={styles.text}>Fornecedor</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SuppliersLoad')}>
          <MaterialIcons name="chevron-right" size={32} color="teal" />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <MaterialIcons name="shopping-cart" size={22} color="teal" />
        <Text style={styles.text}>Pedidos</Text>
        <TouchableOpacity onPress={() => navigation.navigate(route)}>
          <MaterialIcons name="chevron-right" size={32} color="teal" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    width: Dimensions.get('window').width -40,
    height: 70,
    borderColor: 'rgba(0, 128, 128, 0.4)',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    margin: 10
  },
  text: {
    fontSize: 22,
    color: 'black',
    marginLeft: 10,
    flex: 1,
  },
});
