import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

interface CadastroEnderecoScreenProps {
  navigation: any; // 
}
function EnderecoScreen({ navigation }: CadastroEnderecoScreenProps) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titleCadastroScreen}>CADASTRO</Text>
        <Image source={require('../cadastroEnderecoScreen/imgs/cadastroImage.png')} />

        <View style={{ alignItems: 'flex-start', width: 300, paddingTop: 50 }}>
          <Text style={{ fontSize: 20, paddingLeft: 14 }}>CEP <Text style={{ color: 'red' }}>*</Text> </Text>
          <TextInput style={styles.input} />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 55, width: '100%', gap: -180 }}>
          <View style={{ alignItems: 'flex-start', width: 300 }}>
            <Text style={{ fontSize: 20, paddingLeft: 14 }}>Estado</Text>
            <TextInput
              style={{
                height: 40,
                width: 90,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                borderColor: '#7395F7',
                borderRadius: 5,
              }}
              keyboardType='phone-pad'
            />
          </View>

          <View style={{ alignItems: 'flex-start', width: 300 }}>
            <Text style={{ fontSize: 20, paddingLeft: 14 }}>Cidade </Text>
            <TextInput
              style={{
                height: 40,
                width: 150,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                borderColor: '#7395F7',
                borderRadius: 5,
              }}
              keyboardType='phone-pad'
            />
          </View>
        </View>

        <View style={{ alignItems: 'flex-start', width: 300 }}>
          <Text style={{ fontSize: 20, paddingLeft: 14 }}>Bairro</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={{ alignItems: 'flex-start', width: 300 }}>
          <Text style={{ fontSize: 20, paddingLeft: 14 }}>Complemento </Text>
          <TextInput style={styles.input} />
        </View>

        <View
          style={{
            paddingTop: 30,
            paddingBottom: 40,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 30,
          }}>
          <TouchableOpacity
            style={[
              styles.button,
              { width: 170, height: 50, backgroundColor: 'white', borderColor: '#7395F7', borderWidth: 2 },
            ]}
            onPress={() => navigation.navigate('CadastroTipoSanguineo')}
            >
            <Text style={{ fontSize: 20 }}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { width: 170, height: 50,backgroundColor: '#7395F7' }]}
            onPress={() => navigation.navigate('CadastroSenha')}
           >
            <Text style={{ fontSize: 20, color: 'white' }}>Continuar</Text>
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
  input: {
    height: 40,
    width: 270,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#7395F7',
    borderRadius: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#7395F7',
  },
});
export default EnderecoScreen