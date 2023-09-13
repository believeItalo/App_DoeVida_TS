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
      <Image source={require('./imgs/menu.png')}></Image>
      <Text style={styles.title}>Ajuda</Text>
      <Image source={require('../ajuda/imgs/profilePicUser.png')} style={{ height: 70, width: 70 }} />
    </View>
    <View>
      <Image source={require('./imgs/imgAjuda.png')}></Image>
    </View>
    <View style={styles.alignReadMoreText}>
    <ReadMoreText
      initialText={`Disponibilizamos uma lista completa de postos de coleta próximos a você, juntamente com seus endereços e informações de contato. Verifique o posto mais conveniente para agendar sua doação.`}
      maxLength={200}
      titleWhenClosed="Pontos de Coleta"
      titleWhenOpen="Pontos de Coleta"
    />
    <View style={styles.lineBetweenTextBox}></View>
     <ReadMoreText
      initialText={`Confira os horários de atendimento de cada posto de coleta para planejar sua visita com antecedência. Trabalhamos para oferecer horários flexíveis, tornando mais fácil para você encontrar um momento adequado para doar sangue.`}
      maxLength={200}
      titleWhenClosed="Horários De Atendimento"
      titleWhenOpen="Horários De Atendimento"
    />
    <View style={styles.lineBetweenTextBox}></View>
       <ReadMoreText
      initialText={`Sua segurança e bem-estar são nossa prioridade. Antes de doar, nossa equipe qualificada realizará uma triagem para garantir que você esteja apto e saudável para doar sangue. Além disso, forneceremos todas as informações necessárias para o pós-doação, garantindo que você se recupere plenamente após o procedimento.`}
      maxLength={200}
      titleWhenClosed="Segurança e Cuidado"
      titleWhenOpen="Segurança e Cuidado"
    />
    <View style={styles.lineBetweenTextBox}></View>
      <ReadMoreText
      initialText={`Se você tiver alguma dúvida, preocupação ou precisar de assistência, nossa equipe de atendimento ao doador está disponível para ajudá-lo. Entre em contato conosco através do telefone e e-mail,teremos o prazer de atendê-lo.`}
      maxLength={200}
      titleWhenClosed="Entre em Contato"
      titleWhenOpen="Entre em Contato"
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
  lineBetweenTextBox:{
     height:1,
     width:'70%',
     backgroundColor:'#C8C8C8'
    },
    alignReadMoreText:{
      alignItems:'center',
      justifyContent:'center',
      width:'100%'
    }
});
