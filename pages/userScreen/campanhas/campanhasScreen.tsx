import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getStrings } from '../../../strings/arquivoDeStrings';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


interface UserDate {
  name: string;
  photo: string;
  email: string;
  phone: string;
  weight: string;
  age: number;
  bloodType: string;
  sex: string;
  cpf: string;
}

interface Address {
  complement: string | undefined;
  street: string | undefined;
  cep: string | undefined;
  uf: string;
  city: string;
  neighborhood: string;
}

const Stack = createNativeStackNavigator();

export default function MainUserScreen() {
  return (
    <ScrollView>
      <View style={styles.cpntainerPrincipal}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>{getStrings().welcomeText}</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.userImage}>
    
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.containerImgHospital}>
                <Image style={styles.imgHospital} source={require('./img/profilePicHemocentro.png')}></Image>
              </View>
              <View style={styles.containerTexto}>
                <Text style={styles.textHospital}>Hospital Notredame</Text>
                <Text style={styles.textHospital}>Intermedica</Text>
              </View>
              <View style={styles.containerCurtir}>
                <Image style={styles.imgCurtir} source={require('./img/coracao.png')}></Image>
              </View>
            </View>
            <View style={styles.linhaContainer}>
              <View style={styles.linha}></View>
            </View>
            <View>
              <Image style={styles.imgPublicidade} source={require('./img/publicidade.png')}></Image>
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.containerImgHospital}>
                <Image style={styles.imgHospital} source={require('./img/profilePicHemocentro.png')}></Image>
              </View>
              <View style={styles.containerTexto}>
                <Text style={styles.textHospital}>Hospital Notredame</Text>
                <Text style={styles.textHospital}>Intermedica</Text>
              </View>
              <View style={styles.containerCurtir}>
                <Image style={styles.imgCurtir} source={require('./img/coracao.png')}></Image>
              </View>
            </View>
            <View style={styles.linhaContainer}>
              <View style={styles.linha}></View>
            </View>
            <View>
              <Image style={styles.imgPublicidade} source={require('./img/publicidadeDoa.png')}></Image>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imgPublicidade: {
    width: 270,
    height: 270
  },
  linhaContainer: {
    height: 15,
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingTop: 5
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
  linha: {
    width: 260,
    height: 1, // Altura da linha
    backgroundColor: '#BDBDBD',
  },
  imgCurtir: {
    height: 40,
    width: 40
  },
  containerCurtir: {
    width: 112,
    height: 100,

    alignItems: "flex-end",
    paddingRight: 15,
    paddingTop: 10
  },
  textHospital: {
    fontSize: 13
  },
  containerTexto: {

    height: 100,

    justifyContent: "center",
    paddingBottom: 20
  },
  imgHospital: {
    width: 45,
    height: 45
  },
  containerImgHospital: {
    width: 70,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10

  },
  cardHeader: {
    width: "100%",
    height: 70,
    flexDirection: "row"
  },
  cardContainer: {
    height: 500,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 300,
    height: 380,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 15,
    backgroundColor: "white",
    alignItems: "center"
  },
  cpntainerPrincipal: {

    width: "100%",
    height: "100%",
  },
  container: {
    height: 110,
    backgroundColor: '#4E7BF2',
    display: "flex",
    flexDirection: "row",
  },
  img: {
    width: 30,
    height: 30,
  },
  containerText: {

    width: 200,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingRight: 20
  },
  text: {
    color: "white",
    fontSize: 25,
  },
  containerImgUser: {
    height: 110,
    width: 100,
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 15
  },
  imgUser: {
    width: 50,
    height: 50,
    borderRadius: 50
  },


});
