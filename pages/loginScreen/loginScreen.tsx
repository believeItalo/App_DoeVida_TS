import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, Alert } from 'react-native';
import axios from 'axios'; // Importe a biblioteca Axios
import { getStrings } from '../../strings/arquivoDeStrings';

const Stack = createNativeStackNavigator();

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState(''); // Estado para o email
  const [password, setPassword] = useState(''); // Estado para a senha

  // Função para lidar com a alteração do campo de email
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  // Função para lidar com a alteração do campo de senha
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  // Função para lidar com o envio do formulário de login
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.16:5050/api/v1/user-login', {
        email: email,
        password: password,
      });
  
      if (response.status === 200) {
        const userData = response.data.userData;
  
        // Aqui você pode fazer algo com os dados do usuário, como armazenar o token no AsyncStorage.
  
        // Navegue para a tela principal após o login bem-sucedido.
        navigation.navigate('MainUserScreen');
      } else {
        // Trate outros códigos de status da API, se necessário.
        Alert.alert('Erro', 'Ocorreu um erro ao efetuar o login. Verifique suas credenciais e tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao efetuar login:', error);
  
      // Trate erros de requisição ou validações da API, se necessário.
      Alert.alert('Erro', 'Ocorreu um erro ao efetuar o login. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getStrings().loginTitle}</Text>
      <Image source={require('../loginScreen/imgs/loginImage.png')} />

      <SafeAreaView style={styles.inputContainer}>
        <View>
          <Text style={styles.inputTitle}>{getStrings().emailLabel}</Text>
          <TextInput
            style={styles.input}
            placeholder={getStrings().emailLabel}
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>{getStrings().senhaLabel}</Text>
          <TextInput
            style={styles.input}
            placeholder={getStrings().senhaLabel}
            secureTextEntry={true}
            value={password}
            onChangeText={handlePasswordChange}
          />
        </View>

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>{getStrings().forgotPasswordLabel}</Text>
        </View>
      </SafeAreaView>

      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>{getStrings().noAccountLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    paddingBottom: 50,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: 'black',
  },
  input: {
    height: 40,
    width: 300,
    marginVertical: 6,
    borderWidth: 1,
    padding: 10,
    borderColor: '#7395F7',
    borderRadius: 5,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    width: 300,
  },
  forgotPasswordText: {
    color: '#7395F7',
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: '#2C62F1',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  signupText: {
    color: '#7395F7',
  },
});
