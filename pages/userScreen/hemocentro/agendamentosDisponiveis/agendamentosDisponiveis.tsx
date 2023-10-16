import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, } from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import { getStrings } from '../../../../strings/arquivoDeStrings'

interface AgendaDisponivelHemocentroScreenProps {
  navigation: any;
  route: any;
}
interface Hospital {
  photo: string | undefined;
  hospitalId: number;
  name: string;
}
interface Schedule {
  id: number;
  date: string;
  hour: string;
  site: string;
}
export default function AgendaDisponivelHemocentro({ navigation, route }: AgendaDisponivelHemocentroScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [bookSchedules, setBookSchedules] = useState([]);
  const [hospitalData, setHospitalData] = useState<Hospital | null>(null);
  const userData = route.params && route.params.userData ? route.params.userData : null;
  const hemocentroNome = route.params && route.params.hemocentroNome ? route.params.hemocentroNome : '';
  const hospitalId = route.params && route.params.hospitalId ? route.params.hospitalId : null;

  console.log(hospitalId);
  
  useEffect(() => {
    //senai:10.107.144.11:8080
    //http://192.168.0.16:5050/api/v1/hospital-data/${hospitalId} casa italo
    fetch(`http://10.107.144.19:8080/api/v1/hospital-data/${hospitalId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          // Preencha os campos de texto com os dados da API
          const { hospital } = data;

          // Preencha os campos de texto com os dados do hospital e do endereço
          setHospitalData(hospital);
          console.log(data);


        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://10.107.144.19:8080/api/v1/hospital/${hospitalId}/book-schedules`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setBookSchedules(data.bookSchedules);
        } else {
          console.error('Received a non-200 status:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" size={40} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{getStrings().hemocentroTitle}</Text>
          <View >
            {userData && userData.photo && (
              <Image source={{ uri: userData.photo }} style={styles.profileImage} />
            )}
          </View>
        </View>
        <View style={styles.imageContainer}>
          {hospitalData && hospitalData.photo && (
            <Image source={{ uri: hospitalData.photo }} style={styles.profileImageHemocentro} />
          )}
        </View>
        <View style={styles.nomeHemocentroContainer}>
          <Text style={styles.nomeHemocentro}>{hemocentroNome}</Text>
        </View>
        <View style={styles.agendaTitleContainer}>
          <Text style={styles.agendaTitle}>{getStrings().agendaTitle}</Text>
        </View>
        <View style={styles.cardsContainer}>
          {bookSchedules.map((schedule: Schedule) => ( // Provide type for schedule
            <View style={styles.cardAgenda} key={schedule.id}>
              <TouchableOpacity style={styles.contentCardAgenda}>
                <View style={styles.cardInfoRow}>
                  <Text style={styles.titleCardAgenda}>Data:</Text>
                  <Text style={styles.descriptionCardAgenda}>
                    {schedule.date} às {schedule.hour}
                  </Text>
                </View>
                <View style={styles.cardInfoColumn}>
                  <Text style={styles.titleCardAgenda}>Local de doação:</Text>
                  <Text style={styles.descriptionCardAgenda}>
                    {schedule.site}
                  </Text>
                </View>
                <View style={styles.agendarButtonContainer}>
                  <TouchableOpacity style={styles.agendarButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.agendarButtonText}>{"Agendar"}</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <Modal isVisible={modalVisible} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 300, height: 250, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', gap: 40 }}>
          <View style={{ alignItems: 'center', gap: 40 }}>
            <Text style={{ fontSize: 20 }}>{getStrings().confirmAgendaText}</Text>
            <Text style={{ fontSize: 16, color: '#6D6868' }}>{getStrings().confirmAgendaDescription}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 50, justifyContent: 'center' }}>
            <TouchableOpacity style={{ width: 100, height: 50, backgroundColor: '#98E768', alignItems: 'center', justifyContent: 'center', borderRadius: 5, flexDirection: 'row', gap: 20 }}>
              <Text style={{ color: 'white', marginLeft: 5, fontSize: 16 }}>{getStrings().yesButtonText}</Text>
              <FontAwesome5 name="check" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 100, height: 50, backgroundColor: '#EE5353', alignItems: 'center', justifyContent: 'center', borderRadius: 5, flexDirection: 'row', gap: 20 }} onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'white', marginLeft: 5, fontSize: 16 }}>{getStrings().noButtonText}</Text>
              <FontAwesome5 name="times" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  header: {
    height: 170,
    width: 400,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,

  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
  imageContainer: {
    width: 400,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20,
  },
  image: {
    height: 300,
    width: 350,
    borderRadius: 5,
  },
  nomeHemocentroContainer: {
    paddingTop: 50,
  },
  nomeHemocentro: {
    fontSize: 30,
    fontWeight: '300',
  },
  agendaTitleContainer: {
    width: '100%',
    paddingLeft: 20,
    paddingTop: 30,
  },
  agendaTitle: {
    fontSize: 24,
  },
  cardsContainer: {
    paddingBottom: 40,
    paddingTop: 20,
    gap: 15,
  },
  cardAgenda: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#7395F7',
    height: 230,
    width: 300,
  },
  contentCardAgenda: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    paddingTop: 30,
    paddingLeft: 20,
  },
  cardInfoRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  titleCardAgenda: {
    fontSize: 18,
  },
  descriptionCardAgenda: {
    fontSize: 16,
    fontWeight: '300',
  },
  cardInfoColumn: {
    flexDirection: 'column',
    gap: 10,
  },
  agendarButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingRight: 20,
  },
  agendarButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    width: 100,
    height: 60,
    backgroundColor: '#2C62F1',
  },
  agendarButtonText: {
    color: 'white',
  },
  profileImageHemocentro: {
    height: 300,
    width: 400,
    borderRadius:10
}
});




