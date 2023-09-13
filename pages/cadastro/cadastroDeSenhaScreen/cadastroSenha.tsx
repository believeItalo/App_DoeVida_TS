import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { getStrings } from '../../../strings/arquivoDeStrings';
interface CadastroSenhaScreenProps {
  navigation: any;
}

function CadastroSenhaScreen({ navigation }: CadastroSenhaScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleCadastroScreen}>{getStrings().cadastroScreenTitle}</Text>
      <Image
        source={require('../cadastroDeSenhaScreen/imgs/imageCadastroSenha.png')}
      />
      <Text style={styles.subtitle}>{getStrings().subtitleText}</Text>
      <SafeAreaView>
        <Text style={styles.titleInput}>{getStrings().senhaLabelCadastro}</Text>
        <TextInput style={styles.input} />
        <Text style={styles.titleInput}>{getStrings().confirmarSenhaLabel}</Text>
        <TextInput style={styles.input} />
      </SafeAreaView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('CadastroEndereco')}>
          <Text style={styles.buttonText}>{getStrings().voltarButtonLabel}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('MainUserScreen')}>
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
