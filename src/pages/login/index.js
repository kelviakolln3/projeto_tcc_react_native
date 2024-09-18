import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {
    Container,
    Error,
    Form,
    Input,
    Button,
    ButtonText,
    WhiteBox,
} from './styles'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const signIn = async () => {
    //if (email.length == 0) return

    setLoading(true)

    const body = {
        email: email,
        password: password
    }

   /*  try {
      const response = await axios.post('http://192.168.0.22:8080/login', body);
      // Verifica se a resposta foi um sucesso
      if (response.status == 200) {
        const idUsuario = response.data['idUsuario'];
        // Armazenar os dados do usuário
        await AsyncStorage.setItem('idUsuario', JSON.stringify(idUsuario)); */

        setLoading(false)
        // Redireciona para a Home após o login
        navigation.navigate('Home');
      /* } else {
        setLoading(false)
        setErrorMessage('Usuário não existe')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      Alert.alert('Erro', 'Erro ao tentar fazer login');
    } */
  };

  return (
    <Container>
      <WhiteBox>
        <Form>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu email"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={email}
            onChangeText={email => setEmail(email)}
          />

          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite sua senha"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            secureTextEntry={true}
            value={password}
            onChangeText={password => setPassword(password)}
          />

          <Button onPress={signIn}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <ButtonText>Entrar</ButtonText>
            )}
          </Button>
          {!!errorMessage && <Error>{errorMessage}</Error>}
        </Form>
      </WhiteBox>
    </Container>
  );
}
