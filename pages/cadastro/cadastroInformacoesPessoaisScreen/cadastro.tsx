import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';

interface CadastroScreenProps {
  navigation: any;
}

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CADASTRO</Text>
      <Image source={require('../cadastroInformacoesPessoaisScreen/imgs/imgCadastroPessoal.png')} />

      <View style={styles.section}>
        <View style={styles.viewTextPhoto}>
          <Text style={styles.label}>Foto</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={require('../cadastroInformacoesPessoaisScreen/imgs/inputFoto.png')} style={styles.image} />
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>


        <View style={styles.section}>
          <Text style={styles.label}>Nome Completo <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} keyboardType="email-address" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Telefone <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} keyboardType="phone-pad" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>CPF <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} keyboardType="numeric" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Data de Nascimento <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} keyboardType="phone-pad" />
        </View>

        <View style={styles.doubleSection}>
          <View style={styles.halfSection}>
            <Text style={styles.label}>Peso <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.smallInput} keyboardType="phone-pad" />
          </View>
          <View style={styles.halfSection}>
            <Text style={styles.label}>Sexo <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.smallInput} keyboardType="phone-pad" />
          </View>
        </View>
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonTextComeBack}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('CadastroTipoSanguineo')}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(211, 223, 255, 0.5)'
  },
  viewTextPhoto: {
    width: '100%',
    paddingLeft: 70
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
    paddingBottom: 50
  },
  section: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  label: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 6
  },
  required: {
    color: 'red'
  },
  imageContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    paddingTop: 100
  },
  image: {
    width: 135,
    height: 135
  },
  input: {
    height: 40,
    width: 270,
    marginVertical: 6,
    borderWidth: 1,
    padding: 10,
    borderColor: '#7395F7',
    borderRadius: 5
  },
  smallInput: {
    height: 40,
    width: 100,
    marginVertical: 6,
    borderWidth: 1,
    padding: 10,
    borderColor: '#7395F7',
    borderRadius: 5
  },
  doubleSection: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:60,
    width: '100%',
  },
  halfSection: {
    width: '48%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    width: '100%',
    paddingVertical: 30,
   
  },
  button: {
    width: 170,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryButton: {
    backgroundColor: '#2C62F1'
  },
  secondaryButton: {
    borderColor: '#7395F7',
    borderWidth: 2
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  buttonTextComeBack:{
    fontSize: 20,
    color: 'black'
  }
});

export default CadastroScreen;
