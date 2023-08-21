import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleLoginScreen}>Login</Text>
      <Image source={require('../loginScreen/imgs/loginImage.png')} />

      <SafeAreaView>
        <Text style={styles.titleInput}>Email</Text>
        <TextInput
          style={styles.input}
        />
        <Text style={styles.titleInput}>Senha</Text>
        <TextInput
          style={styles.input}
        />
        <View style={styles.viewEsqueceuASenha}>
          <Text style={styles.textEsqueceuASenha}>Esqueceu sua senha?</Text>
        </View>
      </SafeAreaView>
      <TouchableOpacity
        style={[styles.buttonEntrar, { width: 270, height: 50, backgroundColor: '#7395F7' }]}
      >
        <Text style={{ fontSize: 20, color: 'white' }}>Entrar</Text>
      </TouchableOpacity>
      <Text style={{ color: '#7395F7' }}>Não possui uma conta?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    backgroundColor: 'white',
  },
  titleLoginScreen: {
    fontSize: 30,
    fontWeight: '300',
  },
  input: {
    height: 40,
    width: 270,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#7395F7',
    borderRadius: 5,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '300',
    color: 'black',
  },
  viewEsqueceuASenha: {
    alignItems: 'flex-end',
  },
  textEsqueceuASenha: {
    color: '#7395F7',
  },
  buttonEntrar: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
