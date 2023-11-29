import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import { getStrings } from '../../../../strings/arquivoDeStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  book_schedule_id: number | null | undefined;
  id: number;
  date: string;
  hour: string;
  site: string;
}

interface UserDate {
  password: any;
  dateOfBirth: any;
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
  number: string;
}

export default function AgendaDisponivelHemocentro({ navigation, route }: AgendaDisponivelHemocentroScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [bookSchedules, setBookSchedules] = useState<Schedule[]>([]); // Explicitly set the type to Schedule[]
  const [hospitalData, setHospitalData] = useState<Hospital | null>(null);
  const userData = route.params && route.params.userData ? route.params.userData : null;
  const hemocentroNome = route.params && route.params.hemocentroNome ? route.params.hemocentroNome : '';
  const hospitalId = route.params && route.params.hospitalId ? route.params.hospitalId : null;
  const [endereco, setEndereco] = useState<Address | null>(null);
  const [user, setUser] = useState<UserDate | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [scheduledIds, setScheduledIds] = useState<number[]>([]);
  console.log(hospitalId);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Recupere o userId do AsyncStorage
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id !== null) {
          // Realize a chamada à API com o userId recuperado
          fetch(`http://192.168.100.100:5050/api/v1/users/${id}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.status === 200) {
                const { user, address } = data;
                setEndereco(address);
                setUser(user);
                setUserId(user.id); // Certifique-se de que `user.id` seja do tipo `number`
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
    fetch(`http://192.168.100.100:5050/api/v1/hospital-data/${hospitalId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          const { hospital } = data;
          setHospitalData(hospital);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://192.168.100.100:5050/api/v1/hospital/${hospitalId}/book-schedules-mobile`)
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
          <Image source={{ uri: user?.photo }} style={styles.profileImage} />
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
          {bookSchedules.map((schedule) => (
            <View style={styles.cardAgenda} key={schedule.book_schedule_id}>
              <TouchableOpacity style={styles.contentCardAgenda}>
                <View style={styles.cardInfoRow}>
                  <Text style={styles.titleCardAgenda}>Data:</Text>
                  <Text style={styles.descriptionCardAgenda}>
                    {schedule.date} às {schedule.hour}
                  </Text>
                </View>
                <View style={styles.cardInfoColumn}>
                  <Text style={styles.titleCardAgenda}>Local de doação:</Text>
                  <Text style={styles.descriptionCardAgenda}>{schedule.site}</Text>
                </View>
                <View style={styles.agendarButtonContainer}>
                  <TouchableOpacity
                    style={styles.agendarButton}
                    onPress={() => {
                      setSelectedScheduleId(schedule.book_schedule_id!);
                      setModalVisible(true);
                    }}
                  >
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
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                backgroundColor: '#98E768',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                flexDirection: 'row',
                gap: 20,
              }}
              onPress={() => {
                fetch('http://192.168.100.100:5050/api/v1/schedule', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    idUser: userId,
                    idBookSchedule: selectedScheduleId,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.status === 201) {
                      setBookSchedules((prevSchedules) =>
                        prevSchedules.filter((schedule) => schedule.id !== selectedScheduleId)
                      );

                      fetch('http://192.168.100.100:5050/api/v1/schedule-status', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          observation: 'Agendamento',
                          status: "SCHEDULED",
                          idSchedule: data.idSchedule,
                        }),
                      })
                        .then((response) => response.json())
                        .then((statusData) => {
                          if (statusData.status === 201) {
                            console.log('Agendamento realizado com sucesso!');
                            setModalVisible(false);
                            Alert.alert(
                              'Sucesso',
                              'Seu agendamento foi realizado com sucesso!',
                              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                            );
                          } else {
                            console.error('Erro ao definir o status do agendamento:', statusData);
                          }
                        })
                        .catch((error) => {
                          console.error('Erro ao chamar a segunda API:', error);
                        });
                    } else {
                      console.error('Erro ao criar o agendamento:', data);
                    }
                  })
                  .catch((error) => {
                    console.error('Erro ao chamar a primeira API:', error);
                  });
              }}
            >
              <Text style={{ color: 'white', marginLeft: 5, fontSize: 16 }}>Yes</Text>
              <FontAwesome5 name="check" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 100, height: 50, backgroundColor: '#EE5353', alignItems: 'center', justifyContent: 'center', borderRadius: 5, flexDirection: 'row', gap: 20 }}
              onPress={() => setModalVisible(false)}
            >
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
    borderRadius: 10
  }
});