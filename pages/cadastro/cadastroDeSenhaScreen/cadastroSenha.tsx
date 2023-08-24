import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

interface CadastroSenhaScreenProps {
  navigation: any; // 
}

function CadastroSenhaScreen({ navigation }: CadastroSenhaScreenProps) {


  return (
    <View style={styles.container}>
      <Text style={styles.titleCadastroScreen}>Cadastro</Text>
      <Image source={require('../cadastroDeSenhaScreen/imgs/imageCadastroSenha.png')} />
      <Text style={{ fontSize: 20, fontWeight: '300' }}>Defina uma senha </Text>
      <SafeAreaView>
        <Text style={styles.titleInput}>Senha: </Text>
        <TextInput style={styles.input} />
        <Text style={styles.titleInput}>Confirmar senha</Text>
        <TextInput style={styles.input} />
      </SafeAreaView>
      <View style={{ paddingTop: 30, paddingBottom: 30, width: `100%`, display: 'flex', flexDirection: `row`, justifyContent: 'center', gap: 30 }}>
        <TouchableOpacity
          style={[styles.button, { width: 170, height: 50, backgroundColor: "white", borderColor: "#7395F7", borderWidth: 2 }]}
          onPress={() => navigation.navigate('CadastroEndereco')}
          >
          <Text style={{ fontSize: 20 }}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { width: 170, height: 50, backgroundColor: "#7395F7" }]}
          onPress={() => navigation.navigate('MainUserScreen')}
          >
          <Text style={{ fontSize: 20, color: 'white' }}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    backgroundColor: 'white'
  },
  titleLoginScreen: {
    fontSize: 30,
    fontWeight: '300',
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
    color: 'black'
  },
  viewEsqueceuASenha: {
    alignItems: 'flex-end',
  },
  textEsqueceuASenha: {
    color: '#7395F7'
  },
  buttonEntrar: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#7395F7"
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
  },
});
export default CadastroSenhaScreen