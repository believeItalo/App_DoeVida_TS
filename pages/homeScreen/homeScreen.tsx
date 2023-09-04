import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
interface HomeScreenProps {
  navigation: any;
}
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        height: '100%',
        width: '100%',
      }}

      colors={['white', '#D3DFFF']}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.logoContainer}>
            <Image source={require('../homeScreen/imgs/logoHomeScreen.png')} style={{ width: 150, height: 150 }} />
            <Text style={styles.companyName}>DOE VIDA</Text>
          </View>
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
        <View style={styles.logoInomax}>
          <Image source={require('../homeScreen/imgs/logoInomax.png')}></Image>
        </View>
      </View>
    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height:230
  },
  textContainer: {
    alignItems: 'center'
  },
  companyName: {
    fontSize: 36,
    fontWeight: '300',
    color: '#0057FF',
  },
  sloganContainer: {
    alignItems: 'center',
    paddingTop: 10,
    width: 300,
  },
  slogan: {
    fontSize: 24,
    fontWeight: '300',
  },
  buttonContainer: {
    alignItems: 'center',
    height:250,
    justifyContent:'flex-end'
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
    backgroundColor: '#2C62F1'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  buttonTextCadastreSe: {
    fontSize: 20,
    color: 'black',
  },
  logoInomax: {
    paddingTop:100
  }
});

export default HomeScreen;
