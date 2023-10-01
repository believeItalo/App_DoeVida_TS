import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { getStrings } from '../../../strings/arquivoDeStrings';

interface CadastroEnderecoScreenProps {
  navigation: any;
  route: any;
}

function EnderecoScreen({ navigation, route }: CadastroEnderecoScreenProps) {
  const [formData, setFormData] = useState(route.params ? route.params.formDataJSON : {});
  const [cep, setCep] = useState("");
  const [infoCep, setInfoCep] = useState({
    estado: "",
    cidade: "",
    bairro: "",
    numero: "",
    rua: " "
  });

  // Função para atualizar o formData com os dados dos campos de texto
  const updateFormData = () => {
    const updatedFormData = {
      ...formData,
      cep,
      infoCep,
    };
    setFormData(updatedFormData);
  };

  useEffect(() => {
    if (route.params && route.params.formDataJSON) {
      const formData = route.params.formDataJSON;
     
      console.log('Dados do formulário recebidos:', formData);
    }
  }, [route.params]);

  const getCep = async () => {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
      setInfoCep({
        estado: data.uf,
        cidade: data.localidade,
        bairro: data.bairro,
        numero: " ",
        rua: data.logradouro
      });
    } catch (error) {
      // Handle error (e.g., invalid CEP)
      console.error("Error fetching CEP data:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titleCadastroScreen}>{getStrings().cadastroScreenTitle}</Text>
        <Image source={require('../cadastroEnderecoScreen/imgs/cadastroImage.png')} />

        <View style={styles.inputContainer}>
          <Text style={styles.titleInput}>
            {getStrings().cepLabel} <Text style={styles.required}>{getStrings().requiredFieldIndicator}</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={cep}
            onChangeText={novoCep => setCep(novoCep)}
            onBlur={getCep} // Fetch data when the user leaves the CEP field
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.titleInput}>{getStrings().estadoLabel}</Text>
            <TextInput
              style={[styles.input, styles.shortInput]}
              editable={false}
              value={infoCep.estado}

            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.titleInput}>{getStrings().cidadeLabel}</Text>
            <TextInput
              style={[styles.input, styles.mediumInput]}
              editable={false}
              value={infoCep.cidade}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.titleInput}>{getStrings().bairroLabel}</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value={infoCep.bairro} />
        </View>

        <View style={styles.rowContainer2}>
          <View style={styles.columnContainer}>
            <Text style={styles.titleInput}>{getStrings().ruaLabel}</Text>
            <TextInput style={[styles.input, styles.longInput]} editable={false} value={infoCep.rua} />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('CadastroTipoSanguineo')}>
            <Text style={styles.buttonTextComeBack}>{getStrings().voltarButtonLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => {
              navigation.navigate('CadastroSenha', {
                formDataJSON: formData, // Os dados do formulário que você deseja passar
              });
            }}
          >
            <Text style={styles.buttonTextWhite}>{getStrings().continuarButtonLabel}</Text>
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
    height: '100%',
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
    paddingBottom: 50,
  },
  inputContainer: {
    alignItems: 'flex-start',
    width: 300,
    paddingTop: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingLeft: 55,
    width: '100%',
    gap: -180,
  },
  rowContainer2: {
    flexDirection: 'row',
    paddingLeft: 55,
    width: '100%',
  },
  columnContainer: {
    flexDirection: 'column',
  },
  titleInput: {
    fontSize: 20,
    paddingLeft: 14,
    fontWeight: '300',
  },
  required: {
    color: 'red',
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
  shortInput: {
    width: 90,
  },
  mediumInput: {
    width: 150,
  },
  longInput: {
    width: 270,
  },
  buttonContainer: {
    paddingTop: 30,
    paddingBottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    width: 170,
    height: 50,
  },
  primaryButton: {
    backgroundColor: '#2C62F1',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderColor: '#7395F7',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 20,
  },
  buttonTextWhite: {
    color: 'white',
    fontSize: 20
  },
  buttonTextComeBack: {
    fontSize: 20,
    color: 'black'
  }

});

export default EnderecoScreen;
