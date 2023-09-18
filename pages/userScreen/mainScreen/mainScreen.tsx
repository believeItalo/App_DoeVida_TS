import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';
import { getStrings } from '../../../strings/arquivoDeStrings';

const Stack = createNativeStackNavigator();

interface MainUserScreenProps {
  navigation: any;
}

export default function MainUserScreen({ navigation }: MainUserScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>{getStrings().welcomeText}</Text>
          <Text style={[styles.userInfoText, { fontSize: 18, fontWeight: '400' }]}>{getStrings().userName}</Text>
        </View>
        <View style={styles.userImage}>
          <Image source={require('../mainScreen/imgs/profilePic.png')} style={styles.profileImage} />
        </View>
      </View>
      <View style={styles.containerCardContainer}>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BuscaHemocentro')}>
            <Image source={require('../mainScreen/imgs/imgCardHemocentro.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>{getStrings().hemocentrosText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MeuPerfil')}>
            <Image source={require('../mainScreen/imgs/imgCardMeuPerfil.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>{getStrings().meuPerfilText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AjudaScreen')}>
            <Image source={require('../mainScreen/imgs/imgCardAjuda.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>{getStrings().ajudaText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card]} onPress={() => navigation.navigate('QuemPodeDoar')}>
            <Image source={require('../mainScreen/imgs/imgCardQuemPodeDoar.png')} style={styles.cardImage} />
            <View style={styles.quemPodeDoarTextContainer}>
              <Text style={styles.quemPodeDoarText}>{getStrings().quemPodeDoarText}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    height:'25%',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
   
  },
  userInfo: {
    height:'60%',
    alignItems:'center',
    justifyContent:'flex-end'

  },
  userInfoText: {
    fontSize: 20,
    fontWeight: '300',
  },
  userImage: {
    paddingTop: 50,
  },
  profileImage: {
    height: 70,
    width: 70,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap:20
  },
  card: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 20,
    borderRadius: 5,
    width: 165,
    height: 190,
    borderColor: "#7395F7",
    borderWidth: 2,
  },
  cardImage: {
    height: '110%',
    width: '100%',
    borderRadius: 5,
    position: 'absolute',
  },
  cardText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
    paddingBottom: 30,
  },
  quemPodeDoarTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  quemPodeDoarText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
  },
  containerCardContainer:{
    height:'65%',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-evenly',
  }
});
