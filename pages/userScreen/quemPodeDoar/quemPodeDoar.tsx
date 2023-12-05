import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import ReadMoreText from '../ajuda/textExpand';
import ImageExpand from './imageExpand'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStrings } from '../../../strings/arquivoDeStrings';
const Stack = createNativeStackNavigator();

interface AjudaScreenProps {
  navigation: any; //
  route: any;
}
interface UserDate {
  password: any;
  name: string;
  photo: string;
  email: string;
  phone: string;
  weight: string;
  age: number;
  bloodType: string;
  sex: string;
  cpf: string;
}

interface Address {
  complement: string | undefined;
  street: string | undefined;
  cep: string | undefined;
  uf: string;
  city: string;
  neighborhood: string;
}
export default function AjudaScreen({ navigation, route }: AjudaScreenProps) {
  const [userDetails, setUserDetails] = useState(null);
  const userName = route.params && route.params.userName ? route.params.userName : '';
  const userData = route.params && route.params.userData ? route.params.userData : null;
  const [endereco, setEndereco] = useState<Address | null>(null);
  const [user, setUser] = useState<UserDate | null>(null)
  //getdas informacoes do usuario logado
  useEffect(() => {

    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id !== null) {
          // Realize a chamada à API com o userId recuperado
          fetch(`http://${getStrings().url}/api/v1/users/${id}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.status === 200) {
                const { user, address } = data;
                setEndereco(address);
                setUser(user);
                console.log(data);
              }
            })
            .catch((error) => {
              console.error('Erro ao buscar dados da API:', error);
            });
        }
      } catch (e) {
        // Lidar com possíveis erros de leitura do AsyncStorage
        console.error('Erro ao buscar o ID do usuário do AsyncStorage:', e);
      }
    };
    getUserId();
  }, []);
  return (

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" size={40} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Quem Pode Doar</Text>
          <View >
          <Image source={{ uri: user?.photo }} style={{ height: 70, width: 70, borderRadius: 50 }} /> 
          </View>
        </View>
        <View style={styles.viewImgAjuda}>
          <Image source={require('./imgs/imgQuemPodeDoar.png')}></Image>
        </View>
        <View style={styles.alignReadMoreText}>
          <ReadMoreText
            initialText={`
            Estiver em boas condições de saúde. 
            Tiver entre 16 e 69 anos, desde que a primeira 
      doação tenha sido feita até 60 anos (menores de 18 
      anos, precisa de autorização do responsavel).
            Pesar no mínimo 50kg.
            Estar descansado (ter dormido pelo menos 6 horas 
      nas últimas 24 horas).
            Estar alimentado (evitar alimentação gordurosa nas 
      4 horas que antecedem a doação).
            Apresentar documento original com foto recente, 
      que permita a identificação do candidato, emitido por 
      órgão oficial`}
            maxLength={200}
            titleWhenClosed="Você poderá doar se"
            titleWhenOpen="Você poderá doar se"
          />
          <View style={styles.lineBetweenTextBox}></View>
          <ReadMoreText
            initialText={`
      Tiver idade inferior a 16 anos ou superior a 69 anos.
      Tiver peso inferior a 50 quilos.
      Estiver com anemia no teste realizado imediatamente antes da doação.
      Estiver com hipertensão ou hipotensão arterial no momento da doação.
      Estiver com aumento ou diminuição dos batimentos cardíacos no momento da doação.
      Estiver com febre no dia da doação.
      Estiver grávida.
      Estiver amamentando, a menos que o parto tenha ocorrido há mais de 12 meses.
      Obs.: o doador não poderá doar se vier acompanhado de crianças menores de 13 anos sem a presença de um outro adulto para cuidar delas.`}
            maxLength={200}
            titleWhenClosed="Você estará impedido de doar sangue"
            titleWhenOpen="Você estará impedido de doar sangue"
          />
          <View style={styles.lineBetweenTextBox}></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 1100,
  },
  bloodText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300'
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
    paddingBottom: 50
  },
  header: {
    height: 120,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: `center`,
    gap: 30,
    paddingLeft: 20,
    paddingTop: 20,
    backgroundColor: 'rgba(78, 123, 242, 0.76)'
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'white',
  },
  lineBetweenTextBox: {
    height: 1,
    width: '70%',
    backgroundColor: '#C8C8C8'
  },
  alignReadMoreText: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 30
  },
  viewBloodText: {
    width: '80%'
  },
  viewImgAjuda: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 90
  }
});