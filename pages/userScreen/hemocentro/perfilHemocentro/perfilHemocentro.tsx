
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { WebSocketSubject } from 'rxjs/webSocket'; 
import { getStrings } from '../../../../strings/arquivoDeStrings';

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
    const [user, setUser] = useState<UserDate | null>(null)
    const [endereco, setEndereco] = useState<Address | null>(null);
    const [opinion, setOpinion] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [reviewsStatistics, setReviewsStatistics] = useState([]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [isLottieVisible, setIsLottieVisible] = useState(false);
    const [hospitalInfo, setHospitalInfo] = useState<{
        name: string;
        cnpj: string;
        email: string;
        phone: string;
        website: string;
        donationSite: string;
        otherDonationSite: string;
        photo: string;
    } | null>(null);
    console.log(route.params.hemocentroData.hospital.hospitalId);
    
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

    useEffect(() => {
        fetch(`http://${getStrings().url}:8080/api/v1/hospital-data/${route.params.hemocentroData.hospital.hospitalId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    setHospitalData(data.hospital);
                    setEndereco(data.address);
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }, []);
    
    const postReview = () => {
        const currentDate = new Date();
        const ISODate = currentDate.toISOString();

        const reviewData = {
            opinion: opinion,
            date: ISODate,
            idUser: userData.id,
            idHospital: route.params.hemocentroData.hospital.hospitalId,
            idStar: rating,
        };

        fetch(`http://${getStrings().url}:8080/api/v1/review-registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Review enviado com sucesso:', data);
                setModalVisible(false);
                Alert.alert('Avaliação Enviada', 'Sua avaliação foi enviada com sucesso!');
                setRefresh(true); // Define refresh como true para recarregar a tela
            })
            .catch((error) => {
                console.error('Erro ao enviar avaliação:', error);
            });
    };
    
    useEffect(() => {
        const fetchReviewsStatistics = async () => {
            try {
                const response = await axios.get(
                    `http://${getStrings().url}:8080/api/v1/hospital/${route.params.hemocentroData.hospital.hospitalId}/statistics/reviews`
                );

                if (response.status === 200) {
                    setReviewsStatistics(response.data.reviewsStatistics);
                } else {
                    console.error('Erro ao obter estatísticas de avaliações:', response.status);
                }
            } catch (error) {
                console.error('Erro na solicitação para obter estatísticas de avaliações:', error);
            }
        };

        fetchReviewsStatistics();
    }, [route.params.hemocentroData.hospital.hospitalId, refresh]);

    const handleRatingPress = (selectedRating: number) => {
        setRating(selectedRating);
    };

    useEffect(() => {
        const cep = endereco?.cep;

        if (cep) {
            const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil`;

            axios.get(nominatimUrl)
                .then((response) => {
                    const { data } = response;
                    if (data.length > 0) {
                        const { lat, lon } = data[0];
                        setLatitude(parseFloat(lat));
                        setLongitude(parseFloat(lon));
                    }
                })
                .catch((error) => {
                    console.error('Erro ao obter coordenadas a partir do CEP:', error);
                });
        }
    }, [endereco?.cep]);

    return (
        <ScrollView>

            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <FontAwesome5 name="bars" size={40} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Hemocentro</Text>
                    <View>

                        <Image source={{ uri: user?.photo }} style={styles.userimage} />

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
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                region={{
                                    latitude: latitude,
                                    longitude: longitude,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0121,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: latitude,
                                        longitude: longitude,
                                    }}
                                    title="Localização Hemocentro"
                                />
                            </MapView>
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
                        hospitalId: route.params.hemocentroData.hospital.hospitalId,
                    })}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>Agendamentos Disponiveis</Text>
                </TouchableOpacity>

                <ScrollView>
                    <View style={styles.columnCardsAvaliacao}>
                        {reviewsStatistics.map((review: {starRating:any
                            photo: any; name: string | number | boolean | React.ReactElement<any, string |
                                React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal |
                            null | undefined; date: string | number | boolean | React.ReactElement<any, string |
                                React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal |
                            null | undefined; opinion: string | number | boolean | React.ReactElement<any, string |
                                React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null |
                            undefined;
                        }, index: React.Key | null | undefined) => (
                            <View style={styles.cardAvaliacao} key={index}>
                                <View style={styles.cardAvaliacao} key={index}>
                                    <View style={styles.contentCardAvaliacao}>
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15, paddingRight: 70 }}>
                                                <Image source={{ uri: review.photo }} style={{ height: 70, width: 70, borderRadius: 50 }} />
                                                <View>
                                                    <Text style={styles.titleCardAvaliacao}>{review.name}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        {[...Array(review.starRating || 0)].map((_, i) => (
                                                            <FontAwesome5 key={i} name="star" size={20} color="#FBE410" />
                                                        ))}
                                                    </View>

                                                </View>
                                                <Text>{review.date}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.descriptionAvaliacao}>{review.opinion}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
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
                        <View style={styles.containerMotivo}>
                            <PaperTextInput
                                mode="outlined"
                                multiline
                                placeholder="Digite sua Avaliacao"
                                maxLength={200}
                                style={styles.cardMotivo}
                                onChangeText={(text) => {
                                    setOpinion(text);
                                }}
                            />
                        </View>
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
                        <Pressable style={styles.modalButton} onPress={postReview}>
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
        backgroundColor: 'rgba(78, 123, 242, 0.76)',
    },
    viewSlider: {
        width: 400,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 20,
        paddingTop: 50
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
    mapContainer: {
        width: 120,
        height: 150,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 5,
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
        gap: 31
    },
    inputNomeCompleto: {
        width: 100,
        height: 60,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        borderRadius: 5,
        backgroundColor: 'white',
        fontSize: 12
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
        height: 200,
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
        paddingLeft: 30
    },
    titleCardAvaliacao: {
        fontSize: 20,
    },
    descriptionAvaliacao: {
        fontSize: 16,
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

    cardMotivo: {
        backgroundColor: '#EAEAEA',
        elevation: 5, // elevação da sombra no Android,
        shadowColor: 'black', // Sombra mais escura com Alpha 0.8
        borderColor: 'black',
        width: 300,
        height: 200,
        flexDirection: "column"
    },
    containerMotivo: {
        //backgroundColor:"pink",
        height: 230,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",


    },
    inputAvaliacao: {
        width: 300,
        height: 150,
        borderWidth: 1,
        borderColor: '#2C62F1',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 20,
        textAlignVertical: 'top',
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

