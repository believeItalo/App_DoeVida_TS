import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native'; 
interface CadastroTipoSanguineoScreenProps {
  navigation: any; // 
}


function CadastroTipoSanguineoScreen({ navigation }: CadastroTipoSanguineoScreenProps) {
  return (
    <ScrollView>


      <View style={styles.container}>
        <Text style={styles.titleCadastroScreen}>CADASTRO</Text>
        <Text style={styles.titleCadastroSangueScreen}>Escolha seu tipo sanguíneo (Opcional)</Text>
        <View style={styles.viewAlignBloodsCards}>
          <View style={styles.viewAlignColumnBloodCards}>
            <TouchableOpacity
              style={[styles.buttonSangue]}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/oNegativo.png')} style={styles.bottonBloodImage}></Image>

            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonSangue]}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/bNegativo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonSangue]}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/bPositivo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonSangue]}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/aNegativo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.viewAlignColumnBloodCards}>
            <TouchableOpacity
              style={[styles.buttonSangue]}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/abPositivo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonSangue]}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/abNegativo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonSangue]}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/oPositivo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonSangue]}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/aPositivo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewAlignBottons}>
          <TouchableOpacity
            style={[styles.buttonComeBack]}
            onPress={() => navigation.navigate('CadastroInformacoesPessoais')}
          >
            <Text style={styles.comeBackText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonContinue]}
            onPress={() => navigation.navigate('CadastroEndereco')}
          >
            <Text
              style={styles.continueText}

            >Continuar</Text>
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
    backgroundColor: 'rgba(211, 223, 255, 0.5)',
    width: '100%',
    height: '100%'
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
    paddingBottom: 50
  },
  titleCadastroSangueScreen:{
    fontSize:20
  },
  viewAlignBloodsCards:{
     display: `flex`, 
     flexDirection: 'row', 
     paddingTop: 30 
  },
  buttonSangue: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    borderRadius: 5,
    width: 170,
    height: 170,
    ...Platform.select({
      android: {
        elevation: 8,
        backgroundColor:'white',
      },
    }),
  },
  viewAlignColumnBloodCards:{
    display: 'flex', 
    gap: 20, 
    padding: 10 
  },
  buttonContinue: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#7395F7',
    width: 170, 
    height: 50, 
  },
  buttonComeBack:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    width: 170, 
    height: 50, 
    borderColor: '#7395F7',
    borderWidth: 2
  },
  bottonBloodImage: {
    height: 60,
    width: 50
  },
  viewAlignBottons:{
    paddingTop: 30, 
    paddingBottom: 30, 
    width: `100%`, 
    display: 'flex', 
    flexDirection: `row`, 
    justifyContent: 'center', 
    gap: 30 
  },
  comeBackText:{
    fontSize:18
  },
  continueText:{
    fontSize:18,
    color:'white'
  }
});
export default CadastroTipoSanguineoScreen