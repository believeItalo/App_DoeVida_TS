import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
const Stack = createNativeStackNavigator();

interface AjudaScreenProps {
  navigation: any; // 
}
export default function AjudaScreen({ navigation }: AjudaScreenProps)  {
  
  return (

    <View style={styles.container}>
      <View style={styles.header}>
                <FontAwesome5 name="bars" size={40} color="black" />
                <Text style={styles.title}>Ajuda</Text>
                <Image source={require('../ajuda/imgs/profilePicUser.png')} style={{ height: 70, width: 70 }} />
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
    alignItems:`center`,
    gap: 90,
    paddingLeft: 30,
    paddingTop: 20,
},
title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'black',
}
});
