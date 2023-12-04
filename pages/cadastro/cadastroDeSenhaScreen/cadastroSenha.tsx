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

    }
  }, [route.params]);

  const handleContinuar = async () => {
    try {
      if (senha !== confirmarSenha) {
        Alert.alert('Erro', 'As senhas não correspondem');
        return;
      }

      const formDataWithPassword = {
        "user": {
          "name": formDataJSON.user.name,
          "cpf": formDataJSON.user.cpf,
          "email": formDataJSON.user.email,
          "phone": formDataJSON.user.phone,
          "dateOfBirth": formDataJSON.user.dateOfBirth,
          "weight": formDataJSON.user.weight,
          "photo": formDataJSON.user.photo,
          "password": senha,
          "sex": formDataJSON.user.sex,
          "bloodType": formDataJSON.user.bloodType
        },
        "address": {
          "cep": formDataJSON.address.cep,
          "uf": formDataJSON.address.uf,
          "city": formDataJSON.address.city,
          "neighborhood": formDataJSON.address.neighborhood,
          "street": formDataJSON.address.street,
          "number": formDataJSON.address.number,
          "complement": formDataJSON.address.complement
        }
      };
      console.log('Dados enviados na requisição:', formDataWithPassword);
      const response = await axios.post(`http://${getStrings().url}:8080/api/v1/user-registration`, formDataWithPassword);

      if (response.status === 200) {
        console.log('Usuário cadastrado com sucesso:', response.data);
        Alert.alert('Cadastro efetuado com sucesso', 'Você será redirecionado para a tela de login.');
        navigation.navigate('Login');
      }
    } catch (error: any) {
      console.error('Erro ao enviar dados:', error);

      // Verifique se 'error' é do tipo AxiosError
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response:', error.response);
        }
      }
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
            navigation.navigate('Login');
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