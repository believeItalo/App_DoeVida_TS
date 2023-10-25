import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
const Stack = createNativeStackNavigator();

interface MeuPerfilScreen {
  navigation: any; // 
  route: any;
}

interface UserDate {
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

export default function MeuPerfilScreen({ navigation, route }: MeuPerfilScreen) {

  const [userDetails, setUserDetails] = useState(null);
  const userName = route.params && route.params.userName ? route.params.userName : '';
  const userData = route.params && route.params.userData ? route.params.userData : null;
  const [endereco, setEndereco] = useState<Address | null>(null);
  const [user, setUser] = useState<UserDate | null>(null)

  //Fazer a busca ad api pelo id que vem de:userData.id
  useEffect(() => {
    // Realize a chamada à API quando o componente for montado

    //url senai: http://10.107.144.11:8080/api/v1/users/${userData.id}
    fetch(`http://10.107.144.6:8080/api/v1/users/${userData.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {

          const { user, address } = data

          setEndereco(address)
          setUser(user)

          console.log(data);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ paddingRight: 60, paddingLeft: 20 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MainUserScreen', { userName: userData.name, userData: userData })
              }
            >
              <Image source={require('../perfilScreen/imgs/setaVoltar.png')} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>
            Meu Perfil
          </Text>
        </View>

        <View style={styles.userImage}>
          {userData && userData.photo && (
            <Image source={{ uri: userData.photo }} style={styles.profileImage} />
          )}
        </View>
        <Text style={[styles.userName]}>{userData.name}</Text>
        <TouchableOpacity
          style={[styles.buttonEditarPerfil]}
          onPress={() => navigation.navigate('EditarPerfil', { userData: userData })}
        >
          <Text style={{ fontSize: 20, color: 'white' }}>Editar Perfil</Text>
        </TouchableOpacity>

        <View style={{ paddingTop: 40, paddingBottom: 20 }}>
          <View style={{ backgroundColor: '#EBEBED', width: 350, height: 2 }} />
        </View>

        <View style={{ width: '100%', paddingLeft: 40 }}>
          <Text style={{ fontSize: 20 }}>
            Dados Pessoais
          </Text>
        </View>
        <View style={styles.dadosPessoaisTextFields}>

          <TextInput style={styles.input}
            editable={false}
            label='Nome completo'
            value={user ? user.name : ' '}
          />
          <TextInput style={styles.input}
            editable={false}
            label='E-mail'
            value={user ? user.email : ' '}
          />
          <TextInput style={styles.input}
            editable={false}
            label='Telefone'
            value={user ? user.phone : ' '}
          />

          <View style={styles.viewTextInput}>
            <TextInput style={styles.smallInput}
              editable={false}
              label='Sexo'
              value={user ? user.sex.charAt(0).toUpperCase() + user.sex.slice(1).toLowerCase() : ' '}

            />

            <TextInput style={styles.smallInput}
              label='Peso'
              value={user ? user.weight : ' '}
              editable={false}
            />

            <TextInput style={styles.smallInput}
              label='Idade'
              value={user ? user.age.toString() : ' '}
              editable={false}
            />
          </View>

          <View style={styles.viewBloodType}>
            <TextInput style={styles.bloodTypeInput}
              label='Tipo sanguíneo'
              value={user ? user.bloodType : ' '}
              editable={false}
            />

          </View>

          <TextInput
            style={styles.input}
            label='CPF'
            value={'12345678910'}
            editable={false}
          />


        </View>

        <View style={{ width: '100%', paddingLeft: 40 }}>
          <Text style={{ fontSize: 20 }}>
            Dados Residenciais
          </Text>
        </View>

        <View style={styles.dadosResidenciasTextFields}>

          <TextInput style={styles.input}
            label='CEP'
            value={endereco ? endereco.cep : ' '}
            editable={false}
          />

          <View style={styles.viewDataInput}>
            <TextInput style={styles.smallInputType}
              label='Estado'
              value={endereco ? endereco.uf : ' '}
              editable={false}
            />

            <TextInput style={styles.mediumInput}
              label='Cidade'
              value={endereco ? endereco.city.charAt(0).toUpperCase() + endereco.city.slice(1).toLowerCase() : ' '}
              editable={false} />
          </View>
          <TextInput style={styles.input}
            label='Bairro'
            value={endereco ? endereco.neighborhood : ' '}
            editable={false}
          />
          <TextInput style={styles.input}
            label='Complemento'
            value={endereco ? endereco.complement : ' '}
            editable={false}
          />

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
    paddingBottom: 50,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
    paddingTop: 10,
    gap: 12,
    width: '100%',

  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'black',
  },
  userName: {
    fontSize: 30,
    fontWeight: '400',
    color: 'black',
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonEditarPerfil: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    backgroundColor: "#7395F7",
  },
  dadosPessoaisTextFields: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  userImage: {
    paddingTop: 0,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  dadosResidenciasTextFields: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    height: 60,
    width: 355,
    margin: 12,
    borderWidth: 1,
    borderColor: '#7395F7',
    borderRadius: 5,
    backgroundColor: 'white'
  },
  viewTextInput: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    paddingTop: 7
  },
  mediumInput: {
    width: 245,
    height: 60,
    borderWidth: 1,
    borderColor: '#7395F7',
    borderRadius: 5,
    backgroundColor: 'white'
  },
  smallInput: {
    width: 105,
    height: 60,
    borderWidth: 1,
    borderColor: '#7395F7',
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 15
  },
  viewBloodType: {
    width: '100%',
    paddingLeft: 28,
    paddingTop: 15
  },

  bloodTypeInput: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#7395F7',
    borderRadius: 5,
    backgroundColor: 'white'
  },
  viewDataInput: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    paddingTop: 7
  },
  smallInputType: {
    width: 90,
    height: 60,
    borderWidth: 1,
    borderColor: '#7395F7',
    borderRadius: 5,
    backgroundColor: 'white'
  }
});