import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput as PaperTextInput } from 'react-native-paper';
import axios from 'axios';
import { Alert } from 'react-native';
import { getStrings } from '../../../../strings/arquivoDeStrings';

interface MeusAgendamentosProps {
    navigation: any;
    route: any;
}

interface Agendamentos {
    photo: string | undefined;
    scheduleId: number;
    date: string;
    hour: string;
    site: string;
    status: string;
    hospital: string;
}

interface AgendamentosDisponivel {
    site_id: any;
    book_schedule_id: any;
    id: number,
    name: string,
    date: string,
    hour: string,
    site: string
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



const MeusAgendamentosScreen: React.FC<MeusAgendamentosProps> = ({ navigation }) => {
    const [isCancelModalVisible, setCancelModalVisible] = useState(false);
    const [isRescheduleModalVisible, setRescheduleModalVisible] = useState(false);
    const [schedules, setSchedules] = useState<Agendamentos[]>([]);
    const [bookSchedules, setBookSchedules] = useState<AgendamentosDisponivel[]>([]);
    const [textInputValue, setTextInputValue] = useState('');
    const charactersPerLine = 10;
    const [endereco, setEndereco] = useState<Address | null>(null);
    const [user, setUser] = useState<UserDate | null>(null)
    const [reschedule, setReschedule] = useState<Agendamentos | null>(null)
    const [agendaSelecionada, setAgendaSelecionada] = useState<AgendamentosDisponivel | null>(null);
    const [selectedSchedule, setSelectedSchedule] = useState<Agendamentos | null>(null);
    const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
    const [cancelObservation, setCancelObservation] = useState('');
    const [dataUpdated, setDataUpdated] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const [selectedCardInfo, setSelectedCardInfo] = useState<AgendamentosDisponivel | null>(null);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id !== null) {
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
                console.error('Erro ao buscar o ID do usuário do AsyncStorage:', e);
            }
        };
        getUserId();
    }, [refresh]);

    // GET AGENDAMENTOS USUARIO:
    useEffect(() => {
        const getUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id !== null) {
                    // Realize a chamada à API com o userId recuperado
                    axios.get(`http://${getStrings().url}:8080/api/v1/users/${id}/schedules`)
                        .then((response) => {
                            const { status, schedules } = response.data;
                            if (status === 200 && schedules.length > 0) {
                                // Extrai o idHospital do primeiro agendamento do usuário
                                const idHospital = schedules[0].hospitalId;

                                // Realize a chamada à API de book schedules mobile com o idHospital
                                fetch(`http://${getStrings().url}:8080/api/v1/hospital/${idHospital}/book-schedules-mobile`)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if (data.status === 200) {
                                            setBookSchedules(data.bookSchedules);
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Erro ao buscar os dados da API:', error);
                                    });

                                setSchedules(schedules);
                                setDataUpdated(false);
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
    }, [dataUpdated]);



    const handleCardClick = (schedule: Agendamentos) => {
        setSelectedSchedule(schedule);
    };
    const handleCancelClick = (scheduleId: number) => {
        setSelectedScheduleId(scheduleId);
        toggleCancelModal();
    };
    const toggleCancelModal = () => {
        setCancelModalVisible(!isCancelModalVisible);
    };

    const toggleRescheduleModal = () => {
        setRescheduleModalVisible(!isRescheduleModalVisible);
    };

    const handleCancellationConfirmation = async () => {
        try {
            // Verifica se há um agendamento selecionado
            if (selectedScheduleId !== null) {
                const cancelationData = {
                    id: selectedScheduleId,
                    observation: cancelObservation || 'tive um imprevisto',
                };

                // Faz a requisição para cancelar o agendamento
                const response = await axios.put(`http://${getStrings().url}:8080/api/v1/schedule-cancel`, cancelationData);

                // Verifica a resposta da requisição
                if (response.status === 200) {
                    console.log('Agendamento cancelado com sucesso!');
                    Alert.alert('Sucesso', 'Agendamento cancelado com sucesso!');
                } else {
                    // Handle other response statuses if needed
                }
            } else {
                console.error('Nenhum agendamento selecionado para cancelar.');
                // Lida com o caso em que nenhum agendamento está selecionado
            }
        } catch (error) {
            console.error('Erro ao processar a requisição de cancelamento:', error);
            // Lida com erros durante a requisição
        }

        // Limpa o estado do agendamento selecionado após o cancelamento
        setSelectedSchedule(null);
        setSelectedScheduleId(null);
        setCancelObservation('');

        // Atualiza o estado para refletir a mudança
        setDataUpdated(true);

        // Fecha o modal de cancelamento
        toggleCancelModal();
    };

    const handleReschedulingConfirmation = async () => {
        try {
            // Verifica se há um agendamento selecionado
            if (agendaSelecionada !== null) {
                const rescheduleData = {
                    id: agendaSelecionada.site_id, // Use o campo correto para o ID
                    date: agendaSelecionada.date,
                    hour: agendaSelecionada.hour,
                    siteId: agendaSelecionada.site_id,
                };

                // Faz a requisição para reagendar o agendamento
                const response = await axios.put(`http://${getStrings().url}:8080/api/v1/schedule-reschedule`, rescheduleData);

                // Verifica a resposta da requisição
                if (response.status === 200) {
                    console.log('Agendamento reagendado com sucesso!');
                    Alert.alert('Sucesso', 'Agendamento reagendado com sucesso!');
                } else {
                    // Handle other response statuses if needed
                }
            } else {
                console.error('Nenhum agendamento selecionado para reagendar.');
                // Lida com o caso em que nenhum agendamento está selecionado
            }
        } catch (error) {
            console.error('Erro ao processar a requisição de reagendamento:', error);
            // Lida com erros durante a requisição
        }

        // Limpa o estado do agendamento selecionado após o reagendamento
        setAgendaSelecionada(null);

        // Atualiza o estado para refletir a mudança
        setDataUpdated(true);

        // Fecha o modal de reagendamento
        toggleRescheduleModal();
    };

    const handleCardSelection = (index: number) => {
        setSelectedCardIndex(index);
        const selectedInfo = bookSchedules[index];
        setAgendaSelecionada(selectedInfo);
        setSelectedCardInfo(selectedInfo);
        console.log('Selected Card Info:', selectedInfo);
    };



    return (
        <ScrollView style={{ height: '100%', backgroundColor: 'white', }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <FontAwesome5 name="bars" size={40} color="black" />
                </TouchableOpacity>
                <View style={styles.viewTextHeader}>
                    <Text style={styles.title}>Meus</Text>
                    <Text style={styles.title}>Agendamentos</Text>
                </View>
                <Image source={{ uri: user?.photo }} style={{ height: 70, width: 70, borderRadius: 50 }} />
            </View>
            <View style={styles.viewCardsImages}>
                <Image style={styles.meusAgendamentos} source={require('../meusAgendamentos/imgs/img_principal_agendar.png')}></Image>
            </View>

            <View style={styles.viewCardsAgendamentos}>
                {schedules.map((schedule) => (
                    <View style={styles.cardAgendamentosMy} key={schedule.scheduleId}>
                        <View style={styles.divImgHospital}>
                            <View style={styles.containerImg}>
                                <Image style={{ width: 65, height: 65, borderRadius: 50 }} source={{ uri: schedule.photo }} />
                            </View>
                        </View>
                        <View style={styles.divTextHospital}>
                            <View style={styles.containerTextHospital}>
                                <Text style={styles.textHospitalMy}>{schedule.hospital}</Text>
                                <View style={styles.textDataContainer}>
                                    <Text style={styles.textData}>{schedule.date} às {schedule.hour}</Text>
                                </View>
                                <View style={styles.divTextDescription}>
                                    <Text style={styles.textDescription}>{schedule.site}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.divFinal}>
                            <View style={styles.divTextEstado}>
                                <View style={styles.textEstado}>
                                    {schedule.status === 'PENDING' ? (
                                        <Text style={{ color: 'red', fontSize: 12, fontWeight: '500' }}>Cancelado</Text>
                                    ) : schedule.status === 'SCHEDULED' ? (
                                        <Text style={{ color: 'blue', fontSize: 14, fontWeight: '500' }}>Agendado</Text>
                                    ) : schedule.status === 'RESCHEDULED' ? (
                                        <Text style={{ color: '#FFD700', fontSize: 14, fontWeight: '500', width: 200 }}>Reagendado</Text>
                                    ) : schedule.status === 'CONCLUED' ? (
                                        <Text style={{ color: 'green', fontSize: 14, fontWeight: '500' }}>Concluído</Text>
                                    ) : (
                                        <Text style={{ color: "#E5C05E", fontSize: 14, fontWeight: '500' }}>{schedule.status}</Text>
                                    )}


                                </View>
                            </View>

                            <View style={styles.divIcons}>
                                <View style={styles.containerIcon}>
                                    <TouchableOpacity onPress={() => handleCancelClick(schedule.scheduleId)}>
                                        <Image source={require('./imgs/cancel-event.png')} style={styles.iconCalendar} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={toggleRescheduleModal}>
                                        <Image source={require('./imgs/edit.png')} style={styles.iconEditar} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}


                <Modal visible={isCancelModalVisible} animationType="slide" transparent={true}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalViewCancelar}>
                            <View style={styles.headerModal}>
                                <Image style={{ width: 50, height: 50 }} source={require('./imgs/danger.png')}></Image>
                                <Text style={{ fontSize: 26, fontWeight: '300', color: "white" }}>Cancelar?</Text>
                            </View>
                            <View style={styles.divText}>
                                <Text style={{ fontSize: 15, fontWeight: '300', color: "#6D6868" }}>Digite o motivo do cancelamento</Text>
                                <Text style={{ fontSize: 15, fontWeight: '300', color: "#6D6868" }}>(opcional)</Text>
                            </View>
                            <View style={styles.containerMotivo}>
                                <PaperTextInput
                                    mode="outlined"
                                    multiline
                                    placeholder="Digite o motivo aqui"
                                    maxLength={200}
                                    style={styles.cardMotivo}
                                    value={cancelObservation}
                                    onChangeText={(text) => setCancelObservation(text)}
                                />
                            </View>

                            <View style={styles.divButtonCancelar}>
                                <TouchableOpacity style={styles.buttonDivNao} onPress={toggleCancelModal}>
                                    <Text style={styles.textButton}>Não</Text>
                                    <Image style={styles.imgDiv} source={require('./imgs/remove.png')}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonDivSim} onPress={handleCancellationConfirmation}>
                                    <Text style={styles.textButton}>Sim</Text>
                                    <Image style={styles.imgDiv} source={require('./imgs/correct.png')}></Image>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>

                <Modal visible={isRescheduleModalVisible} animationType="slide" transparent={true}>

                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>


                            <View style={styles.headerModalRemarcar}>
                                <Image style={{ width: 50, height: 50 }} source={require('./imgs/edit-button.png')}></Image>

                                <Text style={{ fontSize: 26, fontWeight: '300', color: "white" }}>Remarcar?</Text>
                            </View>
                            <View style={styles.divText}>
                                <Text style={{ fontSize: 15, fontWeight: '300', color: "#6D6868" }}>Escolha um agendamento</Text>
                            </View>
                            <View style={styles.containerHospital}>

                                <ScrollView contentContainerStyle={{ gap: 15, }}>



                                    {bookSchedules.map((bookSchedule, index) => (
                                        <View key={index}>
                                            <TouchableOpacity onPress={() => handleCardSelection(index)}>
                                                <View style={[styles.cardAgendamentos, selectedCardIndex === index && styles.selectedCard]}>
                                                    <View style={styles.imgHemocentro}>
                                                        <Image source={require('./imgs/hospital.png')}></Image>
                                                    </View>
                                                    <View style={styles.textsCardAgendamentoModal}>
                                                        <Text style={styles.titleCardAgendamentos}>{bookSchedule.name}</Text>
                                                        <Text style={styles.dateAgendamentoCard}>{bookSchedule.date} as {bookSchedule.hour}</Text>
                                                        <Text style={styles.descriptionAgendamentoCard}>{bookSchedule.site}</Text>
                                                    </View>
                                                    <View style={styles.viewStatusAgendamento}>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ))}

                                </ScrollView>

                            </View>

                            <View style={{ width: 350, height: 150 }}>
                                <View style={styles.divButtonRemarcar}>
                                    <TouchableOpacity style={styles.buttonDivNao} onPress={handleReschedulingConfirmation}>
                                        <Text style={styles.textButton}>Não</Text>
                                        <Image style={styles.imgDiv} source={require('./imgs/remove.png')}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonDivSim} onPress={handleReschedulingConfirmation}>
                                        <Text style={styles.textButton}>Sim</Text>
                                        <Image style={styles.imgDiv} source={require('./imgs/correct.png')}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>



                        </View>

                    </View>

                </Modal>

            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imgDiv: {
        width: 20,
        height: 20
    },
    textButton: {
        fontSize: 16,
        color: "white",
        fontWeight: '300',
    },
    buttonDivNao: {
        backgroundColor: "#EE5353",
        width: 100,
        height: 50,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 15
    },
    selectedCard: {
        borderColor: '#2C62F1', // Add your selected card style here
        borderWidth: 2,
    },
    buttonDivSim: {
        backgroundColor: "#2C62F1",
        width: 100,
        height: 50,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
        flexDirection: "row"
    },
    divButtonCancelar: {
        //backgroundColor:"pink",
        height: 100,
        //  width: "100",
        flexDirection: "row",
        justifyContent: "center",
        gap: 40,
        paddingTop: 40
    },
    divButtonRemarcar: {
        //backgroundColor:"pink",
        height: 80,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        gap: 40,
        alignItems: "center",
        paddingLeft: 25,
        paddingTop: 15
    },
    textMotivo: {
        fontSize: 15,
        fontWeight: '300',
        color: "black"
    },
    cardMotivo: {
        backgroundColor: '#EAEAEA',
        elevation: 5, // elevação da sombra no Android,
        shadowColor: 'black', // Sombra mais escura com Alpha 0.8
        borderColor: 'black',
        width: 300,
        height: 200,
        flexDirection: "column"
    },
    divHeaderMotivo: {
        //backgroundColor:"blue",
        paddingLeft: 30,
        paddingTop: 10,
        width: 300,
        height: 30
    },
    containerHospital: {
        //backgroundColor: "orange",
        height: 410,
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 5,
        flexDirection: "column",


    },
    containerMotivo: {
        //backgroundColor:"pink",
        height: 230,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",


    },
    headerModalRemarcar: {
        backgroundColor: "#2C62F1",
        height: 75,
        width: "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        gap: 20,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderColor: 'black',
        elevation: 12, // elevação da sombra no Android,
        shadowColor: 'black',
    },
    headerModal: {
        backgroundColor: "#F43434",
        height: 70,
        width: "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        gap: 20,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderColor: 'black',
        elevation: 12, // elevação da sombra no Android,
        shadowColor: 'black',
    },
    divText: {
        //backgroundColor:"blue",
        height: 60,
        width: "100%",
        alignItems: "center",
        paddingTop: 15
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    header: {
        height: 150,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        paddingLeft: 10,
        paddingTop: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '300',
        color: 'black',
    },
    viewTextHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 195,
    },
    cardAgendamentos: {
        width: 320,
        height: 120,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //padding: 20,
        //gap: 30,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        //elevation: 12, // elevação da sombra no Android,
        shadowColor: 'black'


    },
    viewCardsAgendamentos: {
        alignItems: 'center',
        gap: 20,
        // backgroundColor: 'red',
        paddingBottom: 40,
        paddingTop: 40,

    },
    viewCardsImages: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'red'
    },
    meusAgendamentos: {
        height: 300,
        width: 400
    },
    imgHemocentro: {
        height: 150,
        width: 70,
        //backgroundColor: 'gray',
        //borderRadius: 200,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10
    },
    textsCardAgendamentoModal: {
        flexDirection: 'column',
        width: '70%',
        height: 150,
        //backgroundColor:"red",
        //alignItems:"center",
        justifyContent: "center",
        paddingLeft: 20,
        //paddingBottom: 15
    },
    textsCardAgendamento: {
        flexDirection: 'column',
        width: '50%',
        height: 150,
        // backgroundColor:"red",
        //alignItems:"center",
        justifyContent: "center",
        paddingLeft: 20,
        paddingBottom: 20
    },
    titleCardAgendamentos: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        height: 20,
    },
    dateAgendamentoCard: {
        fontSize: 13,
        fontWeight: '300',
        color: 'black',
        //backgroundColor:"pink",
        height: 22,

    },
    descriptionAgendamentoCard: {
        fontSize: 10,
        fontWeight: '300',
        color: 'black',
        width: 150
    },
    viewStatusAgendamento: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        //backgroundColor:"pink",
        height: 150,
        paddingBottom: 55
    },
    statusAgendamento: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 25,
        justifyContent: 'center',
        gap: 10,
        //backgroundColor:"red",
        width: 100,
        height: 50
    },
    pontoStatusAgendamento: {
        height: 10,
        width: 10,
        borderRadius: 500,
        backgroundColor: '#6AB39D'
    },
    crudIconsAgendamento: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconCalendar: {
        width: 25,
        height: 25
    },
    iconEditar: {
        width: 23,
        height: 23
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

    },
    modalView: {
        height: 640,
        width: 370,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalViewCancelar: {
        height: 500,
        width: 350,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    divImgHospital: {
        width: 100,
        height: 130,
        //backgroundColor:"red",
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 15
    },
    cardAgendamentosMy: {
        width: 390,
        height: 130,
        borderRadius: 15,
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        //padding: 20,
        //gap: 30,
        //borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        elevation: 12, // elevação da sombra no Android,
        shadowColor: 'black',
        paddingLeft: 5
    },
    containerImg: {
        height: 70,
        width: 70,
        //backgroundColor: 'gray',
        borderRadius: 50,
        //paddingRight: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10
    },
    divTextHospital: {
        width: 150,
        height: 130,
        //backgroundColor:"red",
        //alignItems:'center',
        //justifyContent:'center',
        //paddingRight: 15
    },
    containerTextHospital: {
        width: 170,
        height: 130,
        display: 'flex',
        paddingTop: 25,
        flexDirection: "column"
    },
    textHospitalMy: {
        fontSize: 16,
        fontWeight: 'normal', // or any other valid value like 'bold', '100', '200', '300', ..., '900'
        color: 'black',
        height: 20,
        width: 180
    },
    textDataContainer: {
        //backgroundColor:"blue",
        width: 150,
        height: 25,
    },
    textData: {
        fontSize: 13,
        fontWeight: '300',
        color: 'black',
        //backgroundColor:"pink",
        height: 22,
    },
    divTextDescription: {
        width: 150,
        height: 45,
        // backgroundColor:"green"
    },
    textDescription: {
        fontSize: 10,
        fontWeight: '300',
        color: 'black',
        width: 170
    },
    divFinal: {
        width: 132,
        height: 125,
        // backgroundColor:"blue"
    },
    divTextEstado: {
        //backgroundColor:"orange",
        width: 132,
        height: 50,
        flexDirection: "row",
        paddingTop: 15,
        paddingLeft: 40,
    },
    textEstado: {
        // backgroundColor:"purple",
        width: 80,
        height: 100,
        paddingLeft: 6,
        paddingTop: 13
    },
    divPontoRed: {
        //backgroundColor:"black",
        width: 11,
        height: 30,
        paddingTop: 6
    },
    pontoRed: {
        height: 10,
        width: 10,
        borderRadius: 500,
        backgroundColor: '#F43434'
    },
    pontoGreen: {
        height: 10,
        width: 10,
        borderRadius: 500,
        backgroundColor: '#6AB39D'
    },
    pontoAmarelo: {
        height: 10,
        width: 10,
        borderRadius: 500,
        backgroundColor: '#E5C05E'
    },
    divIcons: {
        // backgroundColor:"pink",
        width: "100%",
        height: 50,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 50,
        paddingTop: 30
    },
    containerIcon: {
        //backgroundColor:"green",
        height: 50,
        width: 80,
        flexDirection: 'row',
        gap: 20,
        // paddingTop:10

    }
});

export default MeusAgendamentosScreen;