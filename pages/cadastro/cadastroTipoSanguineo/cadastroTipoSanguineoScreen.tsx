import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { getStrings } from '../../../strings/arquivoDeStrings'

interface CadastroTipoSanguineoScreenProps {
  navigation: any;
  route: any
}

function CadastroTipoSanguineoScreen({ navigation, route }: CadastroTipoSanguineoScreenProps) {
  const [selectedButtons, setSelectedButtons] = useState(Array(8).fill(false));
  const [formData, setFormData] = useState(route.params ? route.params.formDataJSON : {});
  useEffect(() => {
    if (route.params && route.params.formDataJSON) {
      const formData = route.params.formDataJSON;
      console.log('Dados do formulário recebidos:', formData);
    }
  }, [route.params]);
  
  //verifica se o índice atual é igual ao índice passado como parâmetro. Se for igual, o elemento é definido como true, caso contrário, é definido como false.
  const handleClick = (index: number) => {
    // Lista de tipos sanguíneos correspondentes às imagens
    const tiposSanguineos = ['O-', 'B-', 'B+', 'A-', 'AB+', 'AB-', 'O+', 'A+'];
  
    // Atualiza o JSON com o tipo sanguíneo selecionado
    const tipoSanguineoSelecionado = tiposSanguineos[index];
    setFormData({ ...formData, tipoSanguineo: tipoSanguineoSelecionado });
  
    // Atualiza a seleção das imagens
    const newSelectedButtons = selectedButtons.map((selected, i) => i === index);
    setSelectedButtons(newSelectedButtons);
  }
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titleCadastroScreen}>{getStrings().cadastroScreenTitle}</Text>
        <Text style={styles.titleCadastroSangueScreen}>{getStrings().tipoSanguineoTitle}</Text>
        <View style={styles.viewAlignBloodsCards}>
          <View style={styles.viewAlignColumnBloodCards}>
  
            <TouchableOpacity
              style={[styles.buttonSangue, selectedButtons[0] && styles.selectedButton]}
              onPress={() => handleClick(0)}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/oNegativo.png')} style={styles.bottonBloodImage} />
            </TouchableOpacity>
  
  
            <TouchableOpacity
              style={[styles.buttonSangue, selectedButtons[1] && styles.selectedButton]}
              onPress={() => handleClick(1)}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/bNegativo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonSangue, selectedButtons[2] && styles.selectedButton]}
              onPress={() => handleClick(2)}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/bPositivo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
               style={[styles.buttonSangue, selectedButtons[3] && styles.selectedButton]}
               onPress={() => handleClick(3)}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/aNegativo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.viewAlignColumnBloodCards}>
            <TouchableOpacity
               style={[styles.buttonSangue, selectedButtons[4] && styles.selectedButton]}
               onPress={() => handleClick(4)}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/abPositivo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.buttonSangue, selectedButtons[5] && styles.selectedButton]}
                onPress={() => handleClick(5)}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/abNegativo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.buttonSangue, selectedButtons[6] && styles.selectedButton]}
                onPress={() => handleClick(6)}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/oPositivo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
               style={[styles.buttonSangue, selectedButtons[7] && styles.selectedButton]}
               onPress={() => handleClick(7)}
            >
              <Image source={require('../cadastroTipoSanguineo/imgs/aPositivo.png')} style={styles.bottonBloodImage}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('CadastroInformacoesPessoais')}>
            <Text style={styles.buttonTextComeBack}>{getStrings().voltarButtonLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('CadastroEndereco', { formDataJSON: formData })}
          >
            <Text style={styles.buttonText}>{getStrings().continuarButtonLabel}</Text>
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
  titleCadastroSangueScreen: {
    fontSize: 20
  },
  viewAlignBloodsCards: {
    display: `flex`,
    flexDirection: 'row',
    paddingTop: 30
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
  selectedButton: {
    borderColor: 'red'
  },
  buttonSangueSelected: {
    backgroundColor: 'red'
  },
  viewAlignColumnBloodCards: {
    display: 'flex',
    gap: 20,
    padding: 10
  },
  buttonContinue: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2C62F1',
    width: 170,
    height: 50,
  },
  buttonComeBack: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    width: 170,
    height: 50,
    borderColor: '#7395F7',
    borderWidth: 2
  },
  bottonBloodImage: {
    height: 70,
    width: 60
  },
  viewAlignBottons: {
    paddingTop: 30,
    paddingBottom: 30,
    width: `100%`,
    display: 'flex',
    flexDirection: `row`,
    justifyContent: 'center',
    gap: 30
  },
  comeBackText: {
    fontSize: 20
  },
  continueText: {
    fontSize: 20,
    color: 'white'
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
  buttonTextComeBack: {
    fontSize: 20,
    color: 'black'
  }
});
export default CadastroTipoSanguineoScreen