import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

interface CadastroScreenProps {
  navigation: any; // 
}

function CadastroScreen({ navigation }: CadastroScreenProps) {
 

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.titleCadastroScreen}>CADASTRO</Text>
    <Image source={require('../cadastroInformacoesPessoaisScreen/imgs/cadastroImage.png')} />

    <View style={{ width: '100%', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, paddingLeft: 70 }}>Foto</Text>

      <View style={{ width: '100%', height: 120, justifyContent: 'center', alignItems: 'center', paddingBottom:140, paddingTop:100}}>
        <Image source={require('../cadastroInformacoesPessoaisScreen/imgs/inputFoto.png')} style={{ width: 135, height: 135,}} />
      </View>
    </View>

    <View style={{alignItems:'flex-start',width:300,}}>
    <Text style={{fontSize:20, paddingLeft:14}}>Nome Completo <Text style={{color:'red'}}>*</Text> </Text>
    <TextInput style={styles.input} />
    </View>

    <View style={{alignItems:'flex-start',width:300}}>
    <Text style={{fontSize:20, paddingLeft:14}}>Email <Text style={{color:'red'}}>*</Text> </Text>
    <TextInput style={styles.input} keyboardType = 'email-address' />
    </View>

    <View style={{alignItems:'flex-start',width:300}}>
    <Text style={{fontSize:20, paddingLeft:14}}>Telefone <Text style={{color:'red'}}>*</Text> </Text>
    <TextInput style={styles.input} keyboardType = 'phone-pad' />
    </View>

    <View style={{alignItems:'flex-start',width:300}}>
    <Text style={{fontSize:20, paddingLeft:14}}>CPF <Text style={{color:'red'}}>*</Text> </Text>
    <TextInput style={styles.input} keyboardType = 'numeric' />
    </View>

    <View style={{alignItems:'flex-start',width:300}}>
    <Text style={{fontSize:20, paddingLeft:14}}>Data de Nascimento <Text style={{color:'red'}}>*</Text> </Text>
    <TextInput style={styles.input} keyboardType = 'phone-pad' />
    </View>

    <View style={{display:'flex', flexDirection:'row',width:300,gap:-150}}>

    <View style={{alignItems:'flex-start',width:300}}>
    <Text style={{fontSize:20, paddingLeft:14}}>Peso<Text style={{color:'red'}}>*</Text> </Text>
    <TextInput style={{
         height: 40,
         width: 100,
         margin: 12,
         borderWidth: 1,
         padding: 10,
         borderColor: '#7395F7',
         borderRadius: 5,
    }} keyboardType = 'phone-pad' />
    </View>

    <View style={{alignItems:'flex-start',width:300}}>
    <Text style={{fontSize:20, paddingLeft:14}}>Sexo <Text style={{color:'red'}}>*</Text> </Text>
    <TextInput style={{
         height: 40,
         width: 100,
         margin: 12,
         borderWidth: 1,
         padding: 10,
         borderColor: '#7395F7',
         borderRadius: 5,
    }} keyboardType = 'phone-pad' />
    </View>

    </View>
    <View style={{paddingTop:30,paddingBottom:30, width:`100%`, display: 'flex', flexDirection: `row`, justifyContent:'center', gap: 30}}>
    <TouchableOpacity
        style={[styles.button, { width: 170, height: 50, backgroundColor: "white", borderColor: "#7395F7", borderWidth: 2}]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={{fontSize: 20}}>Voltar</Text> 
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { width: 170, height: 50,backgroundColor: "#7395F7" }]}
        onPress={() => navigation.navigate('CadastroTipoSanguineo')}
      >
        <Text 
          style={{fontSize: 20, color:'white'}}
        
          >Continuar</Text>
      </TouchableOpacity>
    </View>
 
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
    paddingBottom: 50
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
  textFieldCadastroScreen: {
    fontSize: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#7395F7'
  }
});
export default CadastroScreen;