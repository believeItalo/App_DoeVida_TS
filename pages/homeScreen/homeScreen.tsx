import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStrings } from '../../strings/arquivoDeStrings';

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
      colors={['white', '#D3DFFF']}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../homeScreen/imgs/logoHomeScreen.png')}
              style={styles.logoHomeScreenImg}
            />
            <Text style={styles.companyName}>{getStrings().companyNameText}</Text>
          </View>
          <View style={styles.sloganContainer}>
            <Text style={styles.slogan}>{getStrings().sloganLine1}</Text>
            <Text style={styles.slogan}>{getStrings().sloganLine2}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.signupButton]}
            onPress={() => navigation.navigate('CadastroInformacoesPessoais')}
          >
            <Text style={styles.buttonTextCadastreSe}>{getStrings().buttonTextCadastreSe}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>{getStrings().buttonTextLogin}</Text>
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
  logoHomeScreenImg: {
    width: 150, 
    height: 150
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent:'center',
    height:'50%'
  },
  companyName: {
    fontSize: 36,
    fontWeight: '300',
    color: '#0057FF',
  },
  sloganContainer: {
    alignItems: 'center',
    width: '100%',
   
    },
  slogan: {
    fontSize: 24,
    fontWeight: '300',
  },
  buttonContainer: {
    alignItems: 'center',
    height:'20%',
    justifyContent:'center',
  },
  button: {
    width: 220,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignSelf:'center',
    justifyContent:'flex-end',
    height:'10%'
  }
});

export default HomeScreen;