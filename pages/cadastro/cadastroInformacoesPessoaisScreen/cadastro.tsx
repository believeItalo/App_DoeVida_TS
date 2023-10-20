import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { getStrings } from '../../../strings/arquivoDeStrings';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { getDownloadURL, uploadBytes, ref, deleteObject } from 'firebase/storage'
import { storage } from '../../../fireBaseConfig';
interface CadastroScreenProps {
  navigation: any;
}

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [dataNascimento, setDataNascimento] = useState<string>('');
  const [peso, setPeso] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [image, setImage] = useState<string | any>(null);
  const [senha, setSenha] = useState<string>('');

  const montarObjetoJSON = () => {
    const formData = {
      user: {
        name: nome,
        cpf: cpf,
        email: email,
        phone: telefone,
        dateOfBirth: dataNascimento,
        weight: parseFloat(peso),
        photo: image || '', // Image URL from Firebase Storage
        password: senha,
        sex: sexo,
        bloodType: '', // O tipo sanguíneo será definido posteriormente
      },
      address: {
        cep: '', // O CEP será definido posteriormente
        uf: '', // O estado será definido posteriormente
        city: '', // A cidade será definida posteriormente
        neighborhood: '', // O bairro será definido posteriormente
        street: '', // A rua será definida posteriormente
        number: '', // O número será definido posteriormente
        complement: '', // O complemento será definido posteriormente
      },
    };

    return formData;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled && result.assets.length > 0) {
      const uploadURL = await uploadImage(result.assets[0].uri)
      setImage(uploadURL);
    }
  };
  const uploadImage = async (uri: string) => {
    const blob = await new Promise<Blob>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(storage, `image-${Date.now()}`);
      const result = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef); // get the download URL from Firebase Storage
      return downloadURL;
    } catch (error) {
      alert(`Error : ${error}`);
    }
  };

  const formatarDataNascimento = (value: string) => {
    if (value.length === 2 && dataNascimento.length === 1) {
      value = value + '/';
    } else if (value.length === 5 && dataNascimento.length === 4) {
      value = value + '/';
    }
    return value;
  };

  const validatePhoneNumber = (input: string) => {
    const phoneRegex = /^\d{10,11}$/; // Regex para verificar se o número tem entre 10 e 11 dígitos

    if (!phoneRegex.test(input)) {
      alert('Por favor, insira um número de telefone válido com 10 ou 11 dígitos numéricos.');
      return false;
    }
    return true;
  };

  const navigateToCadastroTipoSanguineo = () => {
    if (
      nome.trim() === '' ||
      email.trim() === '' ||
      telefone.trim() === '' ||
      !validatePhoneNumber(telefone) || // Validar o número de telefone
      cpf.trim() === '' ||
      parseFloat(peso) < 50 || // Verificando peso
      sexo.trim() === '' ||
      image === null
    ) {
      if (parseFloat(peso) < 50) {
        alert('Ops, você não pode doar sangue estando abaixo de 50 Kg');
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
      return;
    }

    // Implementar outras validações conforme necessário

    const formDataJSON = montarObjetoJSON();
    navigation.navigate('CadastroTipoSanguineo', { formDataJSON });
  };

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
          <TextInput maxLength={100} style={styles.input} value={nome} onChangeText={novoNome => setNome(novoNome)} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            {getStrings().emailLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
          </Text>
          <TextInput maxLength={256} style={styles.input} keyboardType="email-address" value={email} onChangeText={novoEmail => setEmail(novoEmail)} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            {getStrings().telefoneLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
          </Text>
          <TextInput maxLength={15} style={styles.input} keyboardType="phone-pad" value={telefone} onChangeText={novoTelefone => setTelefone(novoTelefone)} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            {getStrings().cpfLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
          </Text>
          <TextInput maxLength={14} style={styles.input} keyboardType="numeric" value={cpf} onChangeText={novoCpf => setCpf(novoCpf)} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            {getStrings().dataNascimentoLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
          </Text>
          <TextInput
            maxLength={10}
            style={styles.input}
            value={dataNascimento}
            onChangeText={(novoDataNascimento) => {
              if (
                novoDataNascimento.length <= 10 &&
                novoDataNascimento.match(
                  /^\d{0,2}\/?\d{0,2}\/?\d{0,4}$/ // RegEx to allow only numbers and '/'
                )
              ) {
                setDataNascimento(formatarDataNascimento(novoDataNascimento));
              }
            }}
          />
        </View>

        <View style={styles.doubleSection}>
          <View style={styles.halfSection}>
            <Text style={styles.label}>
              {getStrings().pesoLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
            </Text>
            <TextInput maxLength={5} style={styles.smallInput} keyboardType="phone-pad" value={peso} onChangeText={novoPeso => setPeso(novoPeso)} />
          </View>
          <View style={styles.halfSection}>
            <Text style={styles.label}>
              {getStrings().sexoLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
            </Text>
            <Picker
              style={styles.pickerSex}
              selectedValue={sexo}
              onValueChange={(itemValue) => setSexo(itemValue)}
            >
              <Picker.Item label="Masculino" value="Masculine" />
              <Picker.Item label="Feminino" value="Feminine" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonTextComeBack}>{getStrings().voltarButtonLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={navigateToCadastroTipoSanguineo}
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
    width: '67%',
  },
  halfSection: {
    width: '48%'
  },
  pickerSex: {
    borderColor: '#7395F7',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
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
