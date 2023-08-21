import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


export default function HomeScreen() {


  return (
    <View style={styles.container}>
      <View style={styles.imagemLogoEmpresa}>
        <Image source={require('../homeScreen/imgs/logoHomeScreen.png')} />
      </View>

      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.textNomeEmpresa}>Doe Vida</Text>
        </View>

        <View style={styles.viewTextSlogan}>
          <Text style={styles.textSloganEmpresa}>Doando vida e </Text>
          <Text style={styles.textSloganEmpresa}>mudando histórias</Text>
        </View>
      </View>

      <View style={styles.boxButtons}>
        <TouchableOpacity
          style={[styles.button, { width: 220, height: 50, backgroundColor: 'white', borderColor: '#7395F7', borderWidth: 2 }]}
          
        >
          <Text style={{ fontSize: 20 }}>Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={[styles.button, { width: 220, height: 50, backgroundColor: '#7395F7' }]}
       
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    justifyContent: 'center',
  },

  boxButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    padding: 10,
    paddingTop: 100,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  textNomeEmpresa: {
    fontSize: 42,
    fontWeight: '300',
    color: '#C80808',
  },
  textSloganEmpresa: {
    fontSize: 30,
    fontWeight: '300',
  },
  viewTextSlogan: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  imagemLogoEmpresa: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
