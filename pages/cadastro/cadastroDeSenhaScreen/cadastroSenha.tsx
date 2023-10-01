import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { getStrings } from '../../../strings/arquivoDeStrings';

interface CadastroSenhaScreenProps {
  navigation: any;
  route: any;
}

function CadastroSenhaScreen({ navigation, route }: CadastroSenhaScreenProps) {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  useEffect(() => {
    if (route.params && route.params.formDataJSON) {
      const formData = route.params.formDataJSON;
      console.log('Dados do formulário recebidos:', formData);
      // Resto do seu código para lidar com os dados
    }
  }, [route.params]);
  const handleSubmit = () => {
    if (senha === confirmarSenha) {
      // Construa o JSON no formato desejado
      const formDataJSON = {
        user: {
          name: route.params.formData?.user?.name || '',
          cpf: route.params.formData?.user?.cpf || '',
          email: route.params.formData?.user?.email || '',
          phone: route.params.formData?.user?.phone || '',
          dateOfBirth: route.params.formData?.user?.dateOfBirth || '',
          weight: route.params.formData?.user?.weight || 0,
          photo: route.params.formData?.user?.photo || '',
          password: senha,
          sex: route.params.formData?.user?.sex || '',
          bloodType: route.params.formData?.user?.bloodType || '',
        },
        address: {
          cep: route.params.formData?.address?.cep || '',
          uf: route.params.formData?.address?.uf || '',
          city: route.params.formData?.address?.city || '',
          neighborhood: route.params.formData?.address?.neighborhood || '',
          street: route.params.formData?.address?.street || '',
          number: "58",
          complement: route.params.formData?.address?.complement || '',
        }
      };

      // Realize a solicitação POST
      fetch('http://192.168.0.16:5050/api/v1/user-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataJSON),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Resposta da solicitação POST:', data);
          // Navegue para a próxima tela ou execute outras ações necessárias após o sucesso da solicitação
        })
        .catch((error) => {
          console.error('Erro na solicitação POST:', error);
          // Trate o erro adequadamente
        });
    } else {
      // Lógica para lidar com senhas que não coincidem
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
          onChangeText={(text) => setSenha(text)}
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
          onPress={handleSubmit}>
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
