import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { getStrings } from '../../../strings/arquivoDeStrings'
import * as ImagePicker from 'expo-image-picker';
// Strings

interface CadastroScreenProps {
  navigation: any;
}
const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {

  //definindo estado dos inputs
  //Nome Completo
  const [textInputName, setTextInputName] = useState(" ")
  const handleTextInputName = (text: string) => {
    setTextInputName(text)
  }
  // Definindo estado da imagem
  const [image, setImage] = useState<string | null>(null);

  // Função responsável por fazer o carregamento da imagem
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{getStrings().cadastroScreenTitle}</Text>
      <Image source={require('../cadastroInformacoesPessoaisScreen/imgs/imgCadastroPessoal.png')} />

      <View style={styles.section}>
        <View style={styles.viewTextPhoto}>
          <Text style={styles.label}>{getStrings().fotoLabel}</Text>
        </View>

        <View style={styles.imageContainer}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.imageUser}
            />
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={require('../cadastroInformacoesPessoaisScreen/imgs/inputFoto.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <View style={styles.section}>
          <Text style={styles.label}>
            {getStrings().nomeCompletoLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
          </Text>
          <TextInput style={styles.input} value={textInputName}
            onChangeText={handleTextInputName} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            {getStrings().emailLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
          </Text>
          <TextInput style={styles.input} keyboardType="email-address" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            {getStrings().telefoneLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
          </Text>
          <TextInput style={styles.input} keyboardType="phone-pad" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            {getStrings().cpfLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
          </Text>
          <TextInput style={styles.input} keyboardType="numeric" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            {getStrings().dataNascimentoLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
          </Text>
          <TextInput style={styles.input} keyboardType="phone-pad" />
        </View>

        <View style={styles.doubleSection}>
          <View style={styles.halfSection}>
            <Text style={styles.label}>
              {getStrings().pesoLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
            </Text>
            <TextInput style={styles.smallInput} keyboardType="phone-pad" />
          </View>
          <View style={styles.halfSection}>
            <Text style={styles.label}>
              {getStrings().sexoLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
            </Text>
            <TextInput style={styles.smallInput} keyboardType="phone-pad" />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonTextComeBack}>{getStrings().voltarButtonLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('CadastroTipoSanguineo')}
        >
          <Text style={styles.buttonText}>{getStrings().continuarButtonLabel}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
  },
  image: {
    width: 135,
    height: 135
  },
  imageUser: {
    width: 135,
    height: 135,
    borderRadius: 100
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 60,
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
  buttonTextComeBack: {
    fontSize: 20,
    color: 'black'
  }
});

export default CadastroScreen;
