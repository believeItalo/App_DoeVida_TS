import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, Alert } from 'react-native';
import { getStrings } from '../../../strings/arquivoDeStrings';
import axios from 'axios';

interface CadastroSenhaScreenProps {
  navigation: any;
  route: any;
}

function CadastroSenhaScreen({ navigation, route }: CadastroSenhaScreenProps) {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [formDataJSON, setFormDataJSON] = useState<any>({ user: {} });

  useEffect(() => {
    if (route.params && route.params.formDataJSON) {
      const formData = route.params.formDataJSON;
      setFormDataJSON(formData);
      console.log('Dados do formulário recebidos:', formData);
    }
  }, [route.params]);
  const handleContinuar = async () => {
    try {
      if (senha !== confirmarSenha) {
        Alert.alert('Erro', 'As senhas não correspondem');
        return;
      }

      const userPayload = {
        ...formDataJSON.user,
        password: senha,
      };

      const formDataWithPassword = {
        ...formDataJSON,
        user: userPayload,
      };

      const response = await axios.post('http://10.107.144.19:8080/api/v1/user-registration', formDataWithPassword);
      if (response.status === 200) {
        // lógica de navegação ou manipulação de sucesso aqui
        console.log('Usuário cadastrado com sucesso:', response.data);
 
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      // lógica de manipulação de erro aqui
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleCadastroScreen}>{getStrings().cadastroScreenTitle}</Text>
      <Image
        source={require('../cadastroDeSenhaScreen/imgs/imageCadastroSenha.png')}
      />
      <Text style={styles.subtitle}>{getStrings().subtitleText}</Text>
      <SafeAreaView>
        <Text style={styles.titleInput}>{getStrings().senhaLabelCadastro}</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={senha}
          onChangeText={(text) => setSenha(text)} // Atualize o estado 'senha' quando o texto mudar
        />
        <Text style={styles.titleInput}>{getStrings().confirmarSenhaLabel}</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={confirmarSenha}
          onChangeText={(text) => setConfirmarSenha(text)}
        />
      </SafeAreaView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('CadastroEndereco')}>
          <Text style={styles.buttonText}>{getStrings().voltarButtonLabel}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={async () => {
            await handleContinuar();
            navigation.navigate('Home');
            Alert.alert('Sucesso', 'Usuário cadastrado, efetue o login');
          }}
        >
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>
            {getStrings().continuarButtonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 270,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#7395F7',
    borderRadius: 5,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '300',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingTop: 30,
    paddingBottom: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    width: 170,
    height: 50,
  },
  primaryButton: {
    backgroundColor: '#2C62F1',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderColor: '#7395F7',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 20,
  },
  buttonTextWhite: {
    color: 'white',
  },
});





export default CadastroSenhaScreen;


