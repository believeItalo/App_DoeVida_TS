import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../homeScreen/imgs/logoHomeScreen.png')} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.companyName}>Doe Vida</Text>
        <View style={styles.sloganContainer}>
          <Text style={styles.slogan}>Doando vida e</Text>
          <Text style={styles.slogan}>mudando histórias</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate('CadastroInformacoesPessoais')}
        >
          <Text style={styles.buttonTextCadastreSe}>Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  companyName: {
    fontSize: 42,
    fontWeight: '300',
    color: '#C80808',
  },
  sloganContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  slogan: {
    fontSize: 30,
    fontWeight: '300',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 100,
  },
  button: {
    width: 220,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  signupButton: {
    backgroundColor: 'white',
    borderColor: '#7395F7',
    borderWidth: 2,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#7395F7',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  buttonTextCadastreSe:{
    fontSize: 20,
    color: 'black',
  }
});

export default HomeScreen;
