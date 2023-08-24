import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';
const Stack = createNativeStackNavigator();

interface MainUserScreenProps {
  navigation: any; // 
}
export default function MainUserScreen({ navigation }: MainUserScreenProps)  {
  

  return (

    <View style={styles.container}>
      <View style={{ height: 130, width: '100%', display: 'flex', flexDirection: 'row', gap: 120, paddingLeft: 40, paddingTop: 30 }}>
        <View style={{ paddingTop: 50 }}>
          <Text style={{ fontSize: 20, fontWeight: '300' }}>Seja bem vindo,</Text>
          <Text style={{ fontSize: 24, fontWeight: '400' }}>João Pedro</Text>
        </View>
        <View style={{ paddingTop: 50 }} >
          <Image source={require('../mainScreen/imgs/profilePic.png')} style={{ height: 70, width: 70 }} />
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 40 }}>
        <View style={{ display: 'flex', gap: 35, padding: 10 }}>
          <TouchableOpacity
            style={[styles.cardUserScreen]}
            onPress={() => navigation.navigate('BuscaHemocentro')}
          >
            <Image source={require('../mainScreen/imgs/imgCardHemocentro.png')} style={styles.imgCards} />
            <Text style={styles.textCards}>
              Hemocentros
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardUserScreen]}
            onPress={() => navigation.navigate('AjudaScreen')}
          >
            <Image source={require('../mainScreen/imgs/imgCardAjuda.png')} style={styles.imgCards} />
            <Text style={styles.textCards}>
              Ajuda
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ display: 'flex', gap: 35, padding: 10 }}>
          <TouchableOpacity
            style={[styles.cardUserScreen]}
            onPress={() => navigation.navigate('MeuPerfil')}
          >
            <Image source={require('../mainScreen/imgs/imgCardMeuPerfil.png')} style={styles.imgCards} />
            <Text style={styles.textCards}>
              Meu Perfil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardUserScreen]}
          >
            <Image source={require('../mainScreen/imgs/imgCardQuemPodeDoar.png')} style={styles.imgCards} />
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}>
              <Text style={{
                fontSize: 20,
                color: 'white',
                fontWeight: '300'
              }}>
                Quem Pode
              </Text>
              <Text style={{
                fontSize: 20,
                color: 'white',
                fontWeight: '300'
              }}>
                Doar?
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    paddingBottom:100
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
    paddingBottom: 50
  },
  cardUserScreen: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 20,
    borderRadius: 5,
    width: 180,
    height: 220,
    borderColor: "#7395F7",
    borderWidth: 2,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#7395F7"
  },
  textCards: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
    paddingBottom: 30
  },
  imgCards: {
    height: 210,
    width: 177,
    borderRadius: 5,
    position: 'absolute'
  }
});
