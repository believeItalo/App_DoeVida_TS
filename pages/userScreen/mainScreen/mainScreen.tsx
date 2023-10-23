import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView, BackHandler, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getStrings } from '../../../strings/arquivoDeStrings';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

interface MainUserScreenProps {
  navigation: any;
  route: any;
}

export default function MainUserScreen({ navigation, route }: MainUserScreenProps) {
  const userName = route.params && route.params.userName ? route.params.userName : '';
  const userData = route.params && route.params.userData ? route.params.userData : null;

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Sair do Aplicativo', 'Tem certeza que deseja sair do aplicativo?', [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Sair',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>{getStrings().welcomeText}</Text>
          <Text style={[styles.userInfoText, { fontSize: 20, fontWeight: '400' }]}>{userName}</Text>
        </View>
        <TouchableOpacity  onPress={() => navigation.navigate('MeuPerfil', { userData: userData })}>
          <View style={styles.userImage}>
            {userData && userData.photo && (
              <Image source={{ uri: userData.photo }} style={styles.profileImage} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.containerCardContainer}>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BuscaHemocentro', { userData: userData })}>
            <Image source={require('../mainScreen/imgs/imgCardHemocentro.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>{getStrings().hemocentrosText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image source={require('../mainScreen/imgs/imgCampanhas.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>{getStrings().campanhaText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AjudaScreen', { userData: userData })}>
            <Image source={require('../mainScreen/imgs/imgCardAjuda.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>{getStrings().ajudaText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card]} onPress={() => navigation.navigate('QuemPodeDoar', { userData: userData })}>
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
    height: '25%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 110,

  },
  userInfo: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: 'black'
  },
  userInfoText: {
    fontSize: 20,
    fontWeight: '300',
    color: 'black'
  },
  userImage: {
    paddingTop: 50,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 20,
    borderRadius: 5,
    width: 165,
    height: 190,
    borderColor: '#7395F7',
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
  containerCardContainer: {
    height: '65%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 20
  },
});
