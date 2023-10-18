
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, Alert, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TextInput } from 'react-native-paper';
const Stack = createNativeStackNavigator();

interface PerfilHemocentroScreenProps {
    navigation: any; // 
    route: any;
}

interface Hospital {
    photo: string | undefined;
    hospitalId: number;
    name: string;
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

export default function PerfilHemocentro({ navigation, route }: PerfilHemocentroScreenProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [selectButton, setSelectButton] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const userName = route.params && route.params.userName ? route.params.userName : '';
    const userData = route.params && route.params.userData ? route.params.userData : null;
    const hemocentroData = route.params && route.params.hemocentroData ? route.params.hemocentroData : null;
    const [hemocentros, setHemocentros] = useState<Hemocentro[]>([]);
    const [hospitalData, setHospitalData] = useState<Hospital | null>(null);
    const [endereco, setEndereco] = useState<Address | null>(null);
    console.log(hemocentroData);

    useEffect(() => {
        // Realize a chamada à API quando o componente for montado
        //url Ítalo: http://192.168.0.16:5050/api/v1/hospital-data/${route.params.hemocentroData.hospital.hospitalId}
        //url senai: http://10.107.144.11:8080/api/v1/hospital-data/${route.params.hemocentroData.hospital.hospitalId}
        fetch(`http://10.107.144.19:8080/api/v1/hospital-data/${route.params.hemocentroData.hospital.hospitalId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    // Preencha os campos de texto com os dados da API
                    const { hospital, address } = data;

                    // Preencha os campos de texto com os dados do hospital e do endereço
                    setHospitalData(hospital);
                    setEndereco(address); // Crie um estado para o endereço
                    console.log(data);


                }
            })
            .catch((error) => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }, []);

    const handleRatingPress = (selectedRating: number) => {
        setRating(selectedRating);
    };

    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <FontAwesome5 name="bars" size={40} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Hemocentro</Text>
                    <View>
                        {userData && userData.photo && (
                            <Image source={{ uri: userData.photo }} style={styles.userimage} />
                        )}
                    </View>
                </View>
                <View style={styles.viewSlider}>

                    <Image source={{ uri: hospitalData ? hospitalData.photo : ' ' }} style={styles.profileImage} />

                </View>

                <View style={styles.viewNomeHemocentro}>
                    <Text style={styles.nomeHemocentro}>
                        {route.params && route.params.hemocentroData ? route.params.hemocentroData.hospital.name : ''}
                    </Text>
                </View>

                <View style={styles.informacoesHospital}>
                    <View style={styles.viewTextInputCpf}>
                        <View style={styles.viewAlignEnderecoField}>
                            <Text style={styles.textEndereco}>Endereco</Text>
                            <TextInput
                                label="CEP"
                                style={styles.inputNomeCompleto}
                                placeholderTextColor={'black'}
                                value={endereco ? endereco.cep : ''}
                                editable={false}
                            />
                        </View>
                        <View style={styles.viewEmailInput}>
                            <TextInput
                                label="UF"
                                style={styles.inputEmail}
                                placeholderTextColor={'black'}
                                value={endereco ? endereco.uf : ''}
                                editable={false}
                            />
                        </View>
                        <View>
                            <Image source={require('../perfilHemocentro/imgs/localizacao.png')} />
                        </View>
                    </View>


                    <View style={styles.viewTextFields}>
                        <TextInput
                            label="Estado"
                            style={styles.textField}
                            placeholderTextColor={'black'}
                            value={endereco ? endereco.city : ''}
                            editable={false}
                        />
                        <TextInput
                            style={styles.textField}
                            label="Cidade"
                            placeholderTextColor={'black'}
                            value={endereco ? endereco.neighborhood : ''}
                            editable={false}
                        />
                        <TextInput
                            style={styles.textField}
                            label='Rua'
                            placeholderTextColor={'black'}
                            value={endereco ? endereco.street : ''}
                            editable={false}
                        />
                        <TextInput
                            style={styles.textField}
                            label='Complemento'
                            placeholderTextColor={'black'}
                            value={endereco ? endereco.complement : ''}
                            editable={false}
                        />
                    </View>

                </View>

                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => navigation.navigate('AgendaDisponivelHemocentro', {
                        hemocentroNome: route.params.hemocentroData.hospital.name,
                        hemocentroData: hemocentros,
                        userName: userData.name,
                        userData: userData,
                        hospitalId: route.params.hemocentroData.hospital.hospitalId, // Include hospital ID
                    })}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>Agendamentos Disponiveis</Text>
                </TouchableOpacity>

                <ScrollView>
                    <View style={styles.columnCardsAvaliacao}>
                        <TouchableOpacity style={styles.cardAvaliacao} onPress={() => navigation.navigate('PerfilHemocentro')} >
                            <View style={styles.contentCardAvaliacao}>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 30, paddingRight: 70 }}>
                                        <Image source={require('../buscaHemocentroScreen/imgs/profilePicHemocentro.png')} style={{ height: 70, width: 70 }} />
                                        <Text style={styles.titleCardAvaliacao}>Beatriz Fideliz</Text>
                                        <Text>11/11/2011</Text>
                                    </View>

                                </View>
                                <View>
                                    <Text style={styles.descriptionAvaliacao}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus a urna a scelerisque. Morbi accumsan odio sit amet nulla eleifend molestie. Nullam pretium tortor est.</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardAvaliacao} onPress={() => navigation.navigate('PerfilHemocentro')} >
                            <View style={styles.contentCardAvaliacao}>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 30, paddingRight: 70 }}>
                                        <Image source={require('../buscaHemocentroScreen/imgs/profilePicHemocentro.png')} style={{ height: 70, width: 70 }} />
                                        <Text style={styles.titleCardAvaliacao}>Beatriz Fideliz</Text>
                                        <Text>11/11/2011</Text>
                                    </View>

                                </View>
                                <View>

                                    <Text style={styles.descriptionAvaliacao}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus a urna a scelerisque. Morbi accumsan odio sit amet nulla eleifend molestie. Nullam pretium tortor est.</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardAvaliacao} onPress={() => navigation.navigate('AgendaDisponivelHemocentro', { hemocentroNome: route.params.hemocentroData.hospital.name, hemocentroData: hemocentros, userName: userData.name, userData: userData })}>
                            <View style={styles.contentCardAvaliacao}>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 30, paddingRight: 70 }}>
                                        <Image source={require('../buscaHemocentroScreen/imgs/profilePicHemocentro.png')} style={{ height: 70, width: 70 }} />
                                        <Text style={styles.titleCardAvaliacao}>Beatriz Fideliz</Text>
                                        <Text>11/11/2011</Text>
                                    </View>

                                </View>
                                <View>

                                    <Text style={styles.descriptionAvaliacao}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus a urna a scelerisque. Morbi accumsan odio sit amet nulla eleifend molestie. Nullam pretium tortor est.</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View style={{ width: '100%', paddingLeft: 20, paddingBottom: 30 }}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { width: 170, height: 50, backgroundColor: 'white', borderColor: '#7395F7', borderWidth: 2 },
                        ]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ fontSize: 20 }}>Avaliar</Text>
                    </TouchableOpacity>


                </View>

            </View>
            <Modal isVisible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 26, fontWeight: '300' }}>Avaliar?</Text>
                        <View style={{ width: 300, alignItems: 'center', paddingTop: 20 }} >
                            <Text style={{ fontSize: 16, fontWeight: '300' }}>Digite a sua opinião sobre o </Text>
                            <Text style={{ fontSize: 16, fontWeight: '300' }}>hospital e deixe uma avaliação</Text>
                        </View>
                        <TextInput
                            style={styles.inputAvaliacao}
                            multiline={true}
                            placeholderTextColor="#888"
                            onChangeText={(text) => {
                                // Aqui você pode fazer algo com o texto digitado
                            }}
                        />
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <View style={styles.ratingContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => handleRatingPress(star)}
                                    style={styles.starButton}
                                >
                                    <FontAwesome5 name="star" size={30} color={star <= rating ? '#FFD700' : '#D3D3D3'} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.modalButtonsContainer}>
                        <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Fechar</Text>
                        </Pressable>
                        <Pressable style={styles.modalButton} onPress={() => console.log("Confirmado")}>
                            <Text style={styles.modalButtonText}>Confirmar</Text>
                        </Pressable>
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
        height: 120,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
        paddingLeft: 10,
        paddingTop: 20,
        backgroundColor:'rgba(78, 123, 242, 0.76)',
    },
    viewSlider: {
        width: 400,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 20,
        paddingTop:50
    },
    title: {
        fontSize: 30,
        fontWeight: '300',
        color: 'white',
    },
    image: {
        height: 300,
        width: 350,
        borderRadius: 5
    },
    nomeHemocentro: {
        fontSize: 30,
        fontWeight: '300',
        color: 'black'
    },
    profileImage: {
        height: 300,
        width: 400,
        borderRadius: 5

    },
    userimage: {
        height: 70,
        width: 70,
        borderRadius: 50
    },
    informacoesHospital: {
        paddingTop: 30,
        flexDirection: 'column',
        gap: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 40
    },
    viewNomeHemocentro: {
        paddingTop: 50
    },
    viewTextFields: {
        width: '100%',
        alignItems: 'center',
        ustifyContent: 'center',
        flexDirection: 'column',
        gap: 10
    },
    textField: {
        width: 353,
        height: 60,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        borderRadius: 5,
        backgroundColor: 'white'
    },
    inputEmail: {
        width: 70,
        height: 60,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        borderRadius: 5,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    viewEmailInput: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    viewTextInputCpf: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 28
    },
    inputNomeCompleto: {
        width: 100,
        height: 60,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        borderRadius: 5,
        backgroundColor: 'white',
        fontSize:12
    },
    textEndereco: {
        fontSize: 16
    },
    viewAlignEnderecoField: {
        flexDirection: 'column',
        gap: 15
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        width: 350,
        height: 50,
        backgroundColor: "#2C62F1"
    },
    cardAvaliacao: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#7395F7',
        height: 250,
        width: 370,
    },
    contentCardAvaliacao: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        gap: 20,
        paddingLeft: 40
    },
    titleCardAvaliacao: {
        fontSize: 20,
    },
    descriptionAvaliacao: {
        fontSize: 14,
        width: 260
    },
    columnCardsAvaliacao: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: 405,
        gap: 30,
        paddingTop: 30,
        paddingBottom: 30,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: 370,
        height: 500
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    inputAvaliacao: {
        width: 300,
        height: 150,
        borderWidth: 1,
        borderColor: '#2C62F1',
        backgroundColor:'white',
        borderRadius: 5,
        marginTop: 20,
    },
    modalButton: {
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#7395F7',
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    starButton: {
        marginHorizontal: 5,
    },
});

