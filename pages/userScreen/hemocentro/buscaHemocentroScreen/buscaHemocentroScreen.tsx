import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Card, IconButton } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { getStrings } from '../../../../strings/arquivoDeStrings';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BuscaHemocentroScreenProps {
  navigation: any;
  route: any;
}
interface Hospital {
  hospitalId: number;
  name: string;
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

interface Hemocentro {
  hospital: Hospital;
  address: Address;
}
export default function BuscaHemocentroScreen({ navigation, route }: BuscaHemocentroScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const userName = route.params && route.params.userName ? route.params.userName : '';
  const userData = route.params && route.params.userData ? route.params.userData : null;
  const [hemocentros, setHemocentros] = useState<Hemocentro[]>([]);
  const [endereco, setEndereco] = useState<Address | null>(null);
  const [user, setUser] = useState<UserDate | null>(null)

  useEffect(() => {
    // Recupere o userId do AsyncStorage
    const getUserId = async () => {
        try {
            const id = await AsyncStorage.getItem('userId');
            if (id !== null) {
                // Realize a chamada à API com o userId recuperado
                fetch(`http://${getStrings().url}:8080/api/v1/users/${id}`)
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

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get(`http://192.168.0.16:5050/api/v1/hospitals`)
      .then(response => {
        if (response.data && response.data.hospitals) {
          setHemocentros(response.data.hospitals);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredHemocentros = hemocentros.filter(hemocentro =>
    hemocentro.hospital.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="bars" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{getStrings().hemocentroTitle}</Text>

        <View>
          
            <Image source={{ uri: user?.photo }} style={styles.profileImage} />
         
        </View>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={18} color="#7395F7" />
        <TextInput
          placeholder="Buscar hemocentro"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchBar}
        />
      </View>

      <ScrollView>
        <View style={styles.columnCardsHemocentros}>
          {filteredHemocentros.map(hemocentro => (
            <TouchableOpacity
              style={styles.cardHemocentros}
              onPress={() => navigation.navigate('PerfilHemocentro', { hemocentroData: hemocentro, userData: userData})}
              key={hemocentro.hospital.hospitalId}
            >
              <View style={styles.contentCardHemocentro}>
                <View>
                  <Image source={require('../buscaHemocentroScreen/imgs/profilePicHemocentro.png')} style={{ height: 70, width: 70 }} />
                </View>
                <View>
                  <View> 
                  <Text style={styles.titleCardHemocentro}>{hemocentro.hospital.name}</Text>
                  </View>
                  
                  <Text style={styles.descriptionHemocentro}>{`${hemocentro.address.uf} - ${hemocentro.address.city}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor:'white',
    width: '100%',
    height: '100%',

  },
  header: {
    height: 120,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: `center`,
    gap: 40,
    paddingLeft: 30,
    paddingTop: 20,
    backgroundColor:'rgba(78, 123, 242, 0.76)',
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
  columnCardsHemocentros: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width:415,
    gap: 30,
    paddingTop: 30,
    paddingBottom: 30,
  },
  cardHemocentros: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#7395F7',
    height: 170,
    width: 340,
    backgroundColor:'white'
  },
  contentCardHemocentro: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    gap: 20,
  },
  titleCardHemocentro: {
    fontSize: 20,
  },
  descriptionHemocentro: {
    fontSize: 14,
  },
  searchBar: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#7395F7',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: 300,
    height: 40,
    gap: 20,
    marginTop:30,
    
  },
});
