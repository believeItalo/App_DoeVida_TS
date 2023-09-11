import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import ReadMoreText from './textExpand';
const Stack = createNativeStackNavigator();

interface AjudaScreenProps {
  navigation: any; // 
}
export default function AjudaScreen({ navigation }: AjudaScreenProps) {

  return (

    <ScrollView>
    <View style={styles.container}>
    <View style={styles.header}>
      <FontAwesome5 name="bars" size={40} color="black" />
      <Text style={styles.title}>Ajuda</Text>
      <Image source={require('../ajuda/imgs/profilePicUser.png')} style={{ height: 70, width: 70 }} />
    </View>
    <View>
      <Image source={require('./imgs/imgAjuda.png')}></Image>
    </View>
    <ReadMoreText
      initialText={`Tiver idade inferior a 16 anos ou superior a 69 anos.
        Obs.: o limite superior para a primeira doação é 60 anos. Quem tem 61 anos ou mais e nunca doou está inapto.
        Tiver peso inferior a 50 quilos.
        Estiver com anemia no teste realizado imediatamente antes da doação.
        Estiver com hipertensão ou hipotensão arterial no momento da doação.
        Estiver com aumento ou diminuição dos batimentos cardíacos no momento da doação.
        Estiver com febre no dia da doação.
        Estiver grávida.
        Estiver amamentando, a menos que o parto tenha ocorrido há mais de 12 meses.
        Obs.: o doador não poderá doar se vier acompanhado de crianças menores de 13 anos sem a presença de um outro adulto para cuidar delas.`}
      maxLength={200}
      titleWhenClosed="Clique para ler mais"
      titleWhenOpen="Clique para fechar"
    />
     <ReadMoreText
      initialText={`Tiver idade inferior a 16 anos ou superior a 69 anos.
        Obs.: o limite superior para a primeira doação é 60 anos. Quem tem 61 anos ou mais e nunca doou está inapto.
        Tiver peso inferior a 50 quilos.
        Estiver com anemia no teste realizado imediatamente antes da doação.
        Estiver com hipertensão ou hipotensão arterial no momento da doação.
        Estiver com aumento ou diminuição dos batimentos cardíacos no momento da doação.
        Estiver com febre no dia da doação.
        Estiver grávida.
        Estiver amamentando, a menos que o parto tenha ocorrido há mais de 12 meses.
        Obs.: o doador não poderá doar se vier acompanhado de crianças menores de 13 anos sem a presença de um outro adulto para cuidar delas.`}
      maxLength={200}
      titleWhenClosed="Clique para ler mais"
      titleWhenOpen="Clique para fechar"
    />
  </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
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
});
