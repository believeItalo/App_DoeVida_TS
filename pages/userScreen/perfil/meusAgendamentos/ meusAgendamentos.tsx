import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Platform } from 'react-native';
interface MeusAgendamentosProps {
    navigation: any;
}
const HomeScreen: React.FC<MeusAgendamentosProps> = ({ navigation }) => {
    const [isCancelModalVisible, setCancelModalVisible] = useState(false);
    const [isRescheduleModalVisible, setRescheduleModalVisible] = useState(false);

    const toggleCancelModal = () => {
        setCancelModalVisible(!isCancelModalVisible);
    };

    const toggleRescheduleModal = () => {
        setRescheduleModalVisible(!isRescheduleModalVisible);
    };

    const handleCancellationConfirmation = () => {
        // Logic for handling cancellation confirmation
        setCancelModalVisible(false);
    };

    const handleReschedulingConfirmation = () => {
        // Logic for handling rescheduling confirmation
        setRescheduleModalVisible(false);
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
                <Image source={require('../meusAgendamentos/imgs/profilePic.png')} style={{ height: 70, width: 70 }} />
            </View>
            <View style={styles.viewCardsImages}>
                <Image source={require('../meusAgendamentos/imgs/meusAgendamentosPic.png')}></Image>
            </View>

            <View style={styles.viewCardsAgendamentos}>
                <View style={styles.cardAgendamentos}>
                    <View style={styles.imgHemocentro}>

                    </View>
                    <View style={styles.textsCardAgendamento}>
                        <Text style={styles.titleCardAgendamentos}>HOSPITAL XPTO</Text>
                        <Text style={styles.dateAgendamentoCard}>16/09/2005 as 13:30</Text>
                        <Text style={styles.descriptionAgendamentoCard}>Descricao do local de doacao xpto</Text>
                    </View>
                    <View style={styles.viewStatusAgendamento}>
                        <View style={styles.statusAgendamento}>
                            <View style={styles.pontoStatusAgendamento}></View>
                            <Text>Concluído</Text>
                        </View>
                        <View style={styles.crudIconsAgendamento}>
                            <TouchableOpacity onPress={toggleCancelModal}>
                                <Image source={require('./imgs/iconCalendar.png')} style={styles.iconCalendar} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleRescheduleModal}>
                                <Image source={require('./imgs/iconReagendar.png')} style={styles.iconCalendar} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.cardAgendamentos}>
                    <View style={styles.imgHemocentro}>

                    </View>
                    <View style={styles.textsCardAgendamento}>
                        <Text style={styles.titleCardAgendamentos}>HOSPITAL XPTO</Text>
                        <Text style={styles.dateAgendamentoCard}>16/09/2005 as 13:30</Text>
                        <Text style={styles.descriptionAgendamentoCard}>Descricao do local de doacao xpto</Text>
                    </View>
                    <View style={styles.viewStatusAgendamento}>
                        <View style={styles.statusAgendamento}>
                            <View style={styles.pontoStatusAgendamento}></View>
                            <Text>Pendente</Text>
                        </View>
                        <View style={styles.crudIconsAgendamento}>
                            <TouchableOpacity onPress={toggleCancelModal}>
                                <Image source={require('./imgs/iconCalendar.png')} style={styles.iconCalendar} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleRescheduleModal}>
                                <Image source={require('./imgs/iconReagendar.png')} style={styles.iconCalendar} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.cardAgendamentos}>
                    <View style={styles.imgHemocentro}>

                    </View>
                    <View style={styles.textsCardAgendamento}>
                        <Text style={styles.titleCardAgendamentos}>HOSPITAL XPTO</Text>
                        <Text style={styles.dateAgendamentoCard}>16/09/2005 as 13:30</Text>
                        <Text style={styles.descriptionAgendamentoCard}>Descricao do local de doacao xpto</Text>
                    </View>
                    <View style={styles.viewStatusAgendamento}>
                        <View style={styles.statusAgendamento}>
                            <View style={styles.pontoStatusAgendamento}></View>
                            <Text>Cancelado</Text>
                        </View>
                        <View style={styles.crudIconsAgendamento}>
                            <TouchableOpacity onPress={toggleCancelModal}>
                                <Image source={require('./imgs/iconCalendar.png')} style={styles.iconCalendar} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleRescheduleModal}>
                                <Image source={require('./imgs/iconReagendar.png')} style={styles.iconCalendar} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.cardAgendamentos}>
                    <View style={styles.imgHemocentro}>

                    </View>
                    <View style={styles.textsCardAgendamento}>
                        <Text style={styles.titleCardAgendamentos}>HOSPITAL XPTO</Text>
                        <Text style={styles.dateAgendamentoCard}>16/09/2005 as 13:30</Text>
                        <Text style={styles.descriptionAgendamentoCard}>Descricao do local de doacao xpto</Text>
                    </View>
                    <View style={styles.viewStatusAgendamento}>
                        <View style={styles.statusAgendamento}>
                            <View style={styles.pontoStatusAgendamento}></View>
                            <Text>Concluído</Text>
                        </View>
                        <View style={styles.crudIconsAgendamento}>
                            <TouchableOpacity onPress={toggleCancelModal}>
                                <Image source={require('./imgs/iconCalendar.png')} style={styles.iconCalendar} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleRescheduleModal}>
                                <Image source={require('./imgs/iconReagendar.png')} style={styles.iconCalendar} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal visible={isCancelModalVisible} animationType="slide" transparent={true}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTitle}>Cancel Appointment</Text>
                                {/* Conteúdo adicional para o cancelamento */}
                                <View style={styles.modalButtonsContainer}>
                                    <TouchableOpacity style={styles.modalButton} onPress={toggleCancelModal}>
                                        <Text style={styles.modalButtonText}>Close</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleCancellationConfirmation}>
                                        <Text style={styles.modalButtonText}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal visible={isRescheduleModalVisible} animationType="slide" transparent={true}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTitle}>Reschedule Appointment</Text>
                                {/* Conteúdo adicional para reagendamento */}
                                <View style={styles.modalButtonsContainer}>
                                    <TouchableOpacity style={styles.modalButton} onPress={toggleRescheduleModal}>
                                        <Text style={styles.modalButtonText}>Close</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleReschedulingConfirmation}>
                                        <Text style={styles.modalButtonText}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    header: {
        height: 170,
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
        width: 195
    },
    cardAgendamentos: {
        width: 350,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 10,
        borderWidth: 1,
        borderColor: 'black',

    },
    viewCardsAgendamentos: {
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'white',
        paddingBottom: 40,
        paddingTop: 40
    },
    viewCardsImages: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgHemocentro: {
        height: 70,
        width: 70,
        backgroundColor: 'gray',
        borderRadius: 200
    },
    textsCardAgendamento: {
        flexDirection: 'column',
        width: '50%'
    },
    titleCardAgendamentos: {
        fontSize: 18,
        color: 'black'
    },
    dateAgendamentoCard: {
        fontSize: 16,
        color: 'black'
    },
    descriptionAgendamentoCard: {
        fontSize: 14,
        color: 'black'
    },
    viewStatusAgendamento: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40
    },
    statusAgendamento: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    pontoStatusAgendamento: {
        height: 10,
        width: 10,
        borderRadius: 500,
        backgroundColor: 'black'
    },
    crudIconsAgendamento: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconCalendar: {
        width: 30,
        height: 30
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
    modalButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
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
});

export default HomeScreen;