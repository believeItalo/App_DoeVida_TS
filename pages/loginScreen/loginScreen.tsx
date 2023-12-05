import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, Alert, Modal } from 'react-native';
import axios from 'axios';
import { getStrings } from '../../strings/arquivoDeStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

interface LoginScreenProps {
  navigation: any;
}


export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };
  const openModal = () => {
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleRecovery = async () => {
    try {
      // Enviar e-mail de recuperação para o e-mail digitado
      console.log('Enviar e-mail de recuperação para:', recoveryEmail);
      // Fazer o POST na API de recuperação de senha
      const response = await axios.post(`http://${getStrings().url}:8080/api/v1/forgot-password`, {
        type: 'user',
        email: recoveryEmail,
      });
  
      // Verificar se o POST foi bem-sucedido
      if (response.status === 200) {
        // Feedback para o usuário (pode ser personalizado conforme necessário)
        Alert.alert('Sucesso', 'E-mail de recuperação enviado com sucesso.');
  
        // Fechar o modal após o envio
        closeModal();
      } else {
        // Caso o POST não tenha sido bem-sucedido
        Alert.alert('Erro', 'Ocorreu um erro ao enviar o e-mail de recuperação. Tente novamente.');
      }
    } catch (error) {
      // Em caso de erro na requisição
      console.error('Erro ao enviar e-mail de recuperação:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar o e-mail de recuperação. Tente novamente.');
    }
  };

  const handleLogin = async () => {
    try {
      //192.168.0.16:5050
      const response = await axios.post(`http://${getStrings().url}:8080/api/v1/user-login`, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const userData = response.data.userData;
        console.log(userData);

        // Armazena o token no AsyncStorage
        await AsyncStorage.setItem('token', userData.token);
        await AsyncStorage.setItem('userId', userData.id.toString());
        // Usar navigation.replace em vez de navigation.navigate
        navigation.replace('MainUserScreen', { userName: userData.name, userData: userData });
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao efetuar o login. Verifique suas credenciais e tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao efetuar o login. Verifique suas credenciais e tente novamente.');
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

            value={email}
            onChangeText={handleEmailChange}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>{getStrings().senhaLabel}</Text>
          <TextInput
            style={styles.input}

            secureTextEntry={true}
            value={password}
            onChangeText={handlePasswordChange}
          />
        </View>

        <TouchableOpacity onPress={openModal}>
          <Text style={styles.forgotPasswordText}>{getStrings().forgotPasswordLabel}</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CadastroInformacoesPessoais')}>
        <Text style={styles.signupText}>{getStrings().noAccountLabel}</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.title}>Recuperação de Senha</Text>

          <Text style={styles.inputTitle}>Informe seu e-mail</Text>
          <TextInput
            style={styles.input}
            value={recoveryEmail}
            onChangeText={setRecoveryEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleRecovery}>
            <Text style={styles.buttonText}>Enviar Recuperação</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.signupText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modal:{
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
