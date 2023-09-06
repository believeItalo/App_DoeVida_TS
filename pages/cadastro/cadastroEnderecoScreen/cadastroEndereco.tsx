import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';

interface CadastroEnderecoScreenProps {
  navigation: any;
}

function EnderecoScreen({ navigation }: CadastroEnderecoScreenProps) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titleCadastroScreen}>CADASTRO</Text>
        <Image source={require('../cadastroEnderecoScreen/imgs/cadastroImage.png')} />

        <View style={styles.inputContainer}>
          <Text style={styles.titleInput}>
            CEP <Text style={styles.required}>*</Text>
          </Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.titleInput}>Estado</Text>
            <TextInput
              style={[styles.input, styles.shortInput]}
              keyboardType='phone-pad'
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.titleInput}>Cidade</Text>
            <TextInput
              style={[styles.input, styles.mediumInput]}
              keyboardType='phone-pad'
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.titleInput}>Bairro</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.rowContainer2}>
          <View style={styles.columnContainer}>
            <Text style={styles.titleInput}>Número</Text>
            <TextInput style={[styles.input, styles.shortInput]} />
          </View>

          <View style={styles.columnContainer}>
            <Text style={styles.titleInput}>Complemento</Text>
            <TextInput style={[styles.input, styles.longInput]} />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('CadastroTipoSanguineo')}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('CadastroSenha')}>
            <Text style={[styles.buttonText, styles.buttonTextWhite]}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
    paddingBottom: 50,
  },
  inputContainer: {
    alignItems: 'flex-start',
    width: 300,
    paddingTop: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingLeft: 55,
    width: '100%',
    gap: -180,
  },
  rowContainer2:{
    flexDirection: 'row',
    paddingLeft: 55,
    width: '100%',
  },
  columnContainer: {
    flexDirection: 'column',
  },
  titleInput: {
    fontSize: 20,
    paddingLeft: 14,
    fontWeight: '300',
  },
  required: {
    color: 'red',
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
  shortInput: {
    width: 90,
  },
  mediumInput: {
    width: 150,
  },
  longInput: {
    width: 175,
  },
  buttonContainer: {
    paddingTop: 30,
    paddingBottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
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

export default EnderecoScreen;
