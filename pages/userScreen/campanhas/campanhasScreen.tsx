import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getStrings } from '../../../strings/arquivoDeStrings';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
interface CampanhasScreenProps {
  navigation: any;
  route: any;
}

interface Address {
  complement: string | undefined;
  street: string | undefined;
  cep: string | undefined;
  uf: string;
  city: string;
  neighborhood: string;
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
interface Campaign {
  city: any;
  uf: any;
  campaign_id: number;
  hospital_id: number;
  hospital_name: string;
  date: string;
  hour: string;
  description: string;
  image: string;
  hospital_photo: string;
}

export default function BuscaCampanhaScreen({ navigation, route }: CampanhasScreenProps) {
  const [endereco, setEndereco] = useState<Address | null>(null);
  const [user, setUser] = useState<UserDate | null>(null);
  const [campanhas, setCampanhas] = useState<Campaign[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredCampanhas, setFilteredCampanhas] = useState<Campaign[]>([]);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id !== null) {
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
        console.error('Erro ao buscar o ID do usuário do AsyncStorage:', e);
      }
    };
    getUserId();
  }, []);

  useFocusEffect(() => {
    const getCampanhas = async () => {
      try {
        const response = await fetch(`http://${getStrings().url}/api/v1/campaigns`);
        const data = await response.json();
        if (data.status === 200) {
          setCampanhas(data.campaigns);
        } else {
          console.error('Erro ao buscar campanhas:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar campanhas:', error);
      }
    };
  
    getCampanhas();
  },);
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://${getStrings().url}/api/v1/campaigns?city=${searchText}`);
      const data = await response.json();
  
      if (data.status === 200) {
        const foundCampanhas = data.campaigns;
        setFilteredCampanhas(foundCampanhas);
  
        if (foundCampanhas.length === 0) {
          Alert.alert('Nenhuma campanha encontrada na região');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar campanhas por cidade:', error);
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="bars" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{"Campanhas"}</Text>
        <View>
          <Image source={{ uri: user?.photo }} style={styles.profileImage} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={18} color="#7395F7" />
          <TextInput
            placeholder="Digite sua cidade"
            style={styles.searchBar}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity
          style={{ width: 80, height: 30, borderRadius: 10, backgroundColor: 'rgba(78, 123, 242, 0.76)', alignItems: 'center', justifyContent: 'center', marginTop: 27 }}
          onPress={handleSearch}
        >
          <Text style={{ color: 'white' }}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginTop: -20, marginBottom: 40 }}>
        <View style={styles.containerPrincipal}>
        {filteredCampanhas.map((campanha) => 
            <View key={campanha.campaign_id} style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.containerImgHospital}>
                    <Image style={styles.imgHospital} source={{ uri: campanha.hospital_photo }} />
                  </View>
                  <View style={styles.containerTexto}>
                    <Text style={styles.textHospital}>{campanha.hospital_name}</Text>
                    <Text style={styles.textHospital}>{campanha.date} - {campanha.hour}</Text>
                    <Text>{`${campanha.uf} - ${campanha.city}`}</Text>
                  </View>
                </View>
                <View style={styles.linhaContainer}>
                  <View style={styles.linha}></View>
                </View>
                <View>
                  <Image style={styles.imgPublicidade} source={{ uri: campanha.image }} />
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imgPublicidade: {
    width: 270,
    height: 270
  },
  linhaContainer: {
    height: 15,
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingTop: 5
  },
  header: {
    height: 120,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    backgroundColor:'rgba(78, 123, 242, 0.76)',
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'white',
  },
  userInfo: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: 'black'
  },
  userInfoText: {
    fontSize: 20,
    fontWeight: '300',
    color: 'black'
  },
  userImage: {
    paddingTop: 50,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
  linha: {
    width: 260,
    height: 1,
    backgroundColor: '#BDBDBD',
  },
  imgCurtir: {
    height: 40,
    width: 40
  },
  containerCurtir: {
    width: 112,
    height: 100,

    alignItems: "flex-end",
    paddingRight: 15,
    paddingTop: 10
  },
  textHospital: {
    fontSize: 13
  },
  containerTexto: {

    height: 100,

    justifyContent: "center",
    paddingBottom: 20
  },
  imgHospital: {
    width: 45,
    height: 45,
    borderRadius:50
  },
  containerImgHospital: {
    width: 70,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10

  },
  cardHeader: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: 'center',
    gap: 20
  },
  cardContainer: {
    height: 500,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop:110
  },
  card: {
    width: 300,
    height: 380,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 15,
    backgroundColor: "white",
    alignItems: "center"
  },
  containerPrincipal: {
    gap: -60,
    marginTop: -60
  },
  container: {
    height: 110,
    backgroundColor: '#4E7BF2',
    display: "flex",
    flexDirection: "row",
  },
  img: {
    width: 30,
    height: 30,
  },
  containerText: {
    width: 200,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingRight: 20
  },
  text: {
    color: "white",
    fontSize: 25,
  },
  containerImgUser: {
    height: 110,
    width: 100,
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 15
  },
  imgUser: {
    width: 50,
    height: 50,
    borderRadius: 50
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
    width: 250,
    height: 40,
    gap: 20,
    marginTop: 30,

  },


});