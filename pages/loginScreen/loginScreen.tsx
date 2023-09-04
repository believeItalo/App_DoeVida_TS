import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Image source={require('../loginScreen/imgs/loginImage.png')} />

      <SafeAreaView style={styles.inputContainer}>
        <View>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput style={styles.input} />
        </View>

        <View>
          <Text style={styles.inputTitle}>Senha</Text>
          <TextInput style={styles.input} />
        </View>


        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </View>
      </SafeAreaView>

      <TouchableOpacity style={[styles.button, styles.loginButton]}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>Não possui uma conta?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    paddingBottom:50
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:30,
    paddingBottom:30
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: 'black',
  },
  input: {
    height: 40,
    width: 300,
    marginVertical: 6,
    borderWidth: 1,
    padding: 10,
    borderColor: '#7395F7',
    borderRadius: 5,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    width:300
  },
  forgotPasswordText: {
    color: '#7395F7',
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: '#2C62F1',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  signupText: {
    color: '#7395F7',
  },
});

export default LoginScreen;
