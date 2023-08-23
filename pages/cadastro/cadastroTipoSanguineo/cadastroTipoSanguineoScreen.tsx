import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

interface CadastroTipoSanguineoScreenProps {
  navigation: any; // 
}


function CadastroTipoSanguineoScreen({ navigation }: CadastroTipoSanguineoScreenProps) {
  return (
    <ScrollView>

       
<View style={styles.container}>
<Text style={styles.titleCadastroScreen}>CADASTRO</Text>
<Text style={{fontSize:20}}>Escolha seu tipo sanguíneo (Opcional)</Text>
<View style={{display:`flex`, flexDirection:'row', paddingTop:30}}>
<View style={{display:'flex', gap:20, padding:10}}>
<TouchableOpacity
          style={[styles.buttonSangue]}
        >
       
</TouchableOpacity>
<TouchableOpacity
          style={[styles.buttonSangue]}
        >
        
</TouchableOpacity>
<TouchableOpacity
          style={[styles.buttonSangue]}
        >
          
</TouchableOpacity>
<TouchableOpacity
          style={[styles.buttonSangue]}
        >
        
</TouchableOpacity>
</View>
<View style={{display:'flex', gap:20, padding:10}}>
<TouchableOpacity
          style={[styles.buttonSangue]}
        >
          
</TouchableOpacity>
<TouchableOpacity
          style={[styles.buttonSangue]}
        >
         
</TouchableOpacity>
<TouchableOpacity
          style={[styles.buttonSangue]}
        >
          
</TouchableOpacity>
<TouchableOpacity
          style={[styles.buttonSangue]}
        >
      
</TouchableOpacity>
</View>
</View>
<View style={{paddingTop:30,paddingBottom:30, width:`100%`, display: 'flex', flexDirection: `row`, justifyContent:'center', gap: 30}}>
      <TouchableOpacity
          style={[styles.button, { width: 170, height: 50, backgroundColor: "white", borderColor: "#7395F7", borderWidth: 2}]}
          onPress={() => navigation.navigate('CadastroInformacoesPessoais')}
        >
          <Text style={{fontSize: 20}}>Voltar</Text> 
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { width: 170, height: 50,backgroundColor: "#7395F7" }]}
          onPress={() => navigation.navigate('CadastroEndereco')}
        >
          <Text 
            style={{fontSize: 20, color:'white'}}
            
            >Continuar</Text>
        </TouchableOpacity>
      </View>
</View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
    paddingBottom: 50
  },
  buttonSangue: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    borderRadius: 5,
    width: 170,
    height: 170,
    backgroundColor: 'white',
    borderColor: '#7395F7',
    borderWidth: 2
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#7395F7'
  }
});
export default CadastroTipoSanguineoScreen