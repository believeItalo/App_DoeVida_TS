import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import ReadMoreText from '../ajuda/textExpand';
const Stack = createNativeStackNavigator();

interface AjudaScreenProps {
  navigation: any; // 
}
export default function AjudaScreen({ navigation }: AjudaScreenProps) {

  return (

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" size={40} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Ajuda</Text>
          <Image source={require('../ajuda/imgs/profilePicUser.png')} style={{ height: 70, width: 70 }} />
        </View>
        <View style={styles.viewImgAjuda}>
          <Image source={require('./imgs/imgQuemPodeDoar.png')}></Image>
        </View>
        <View style={styles.alignReadMoreText}>
          <ReadMoreText
            initialText={`Espera por 48 horas:
      
      Após o término do tratamento de infecções bacterianas (uso de antibióticos).
      Após a cura de rubéola.
      Após a cura de erisipela.
      Espera por quatro semanas:`}
            maxLength={200}
            titleWhenClosed="Você não poderá doar se"
            titleWhenOpen="Você não poderá doar se"
          />
          <View style={styles.lineBetweenTextBox}></View>
          <ReadMoreText
            initialText={`Confira os horários de atendimento de cada posto de coleta para planejar sua visita com antecedência. Trabalhamos para oferecer horários flexíveis, tornando mais fácil para você encontrar um momento adequado para doar sangue.`}
            maxLength={200}
            titleWhenClosed="Horários De Atendimento"
            titleWhenOpen="Horários De Atendimento"
          />
          <View style={styles.lineBetweenTextBox}></View>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 1000,
  },
  bloodText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300'
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
    paddingBottom: 50
  },
  header: {
    height: 170,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: `center`,
    gap: 90,
    paddingLeft: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'black',
  },
  lineBetweenTextBox: {
    height: 1,
    width: '70%',
    backgroundColor: '#C8C8C8'
  },
  alignReadMoreText: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  viewBloodText: {
    width: '80%'
  },
  viewImgAjuda: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});