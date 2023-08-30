import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, TextInput, Alert, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';
import Modal from 'react-native-modal';

const Stack = createNativeStackNavigator();

interface PerfilHemocentroScreenProps {
    navigation: any; // 
}

export default function PerfilHemocentro({ navigation }: PerfilHemocentroScreenProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);

    const handleRatingPress = (selectedRating: number) => {
        setRating(selectedRating);
    };
    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.header}>
                    <FontAwesome5 name="bars" size={40} color="black" />
                    <Text style={styles.title}>Hemocentro</Text>
                    <Image source={require('../perfilHemocentro/imgs/profilePicUser.png')} style={{ height: 70, width: 70 }} />
                </View>
                <View style={{ width: 400, height: 300, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
                    <Image source={require('../perfilHemocentro/imgs/hemocentroPic.png')} style={styles.image}></Image>
                    <Image source={require('../perfilHemocentro/imgs/sliderLength.png')}></Image>
                </View>
                <View style={{ paddingTop: 50 }}>
                    <Text style={styles.nomeHemocentro}>
                        Hospital Nova Vida
                    </Text>
                </View>
                <View style={styles.informacoesHospital}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 28 }}>
                        <View style={{ flexDirection: 'column', gap: 15 }}>
                            <Text style={{ fontSize: 16 }}>
                                Endereco
                            </Text>
                            <TextInput style={{
                                width: 100, height: 40, borderWidth: 1,
                                padding: 10,
                                borderColor: '#F0F0F0',
                                borderRadius: 5,
                            }} placeholder='CPF' placeholderTextColor={'black'} ></TextInput>
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <TextInput style={{
                                width: 50, height: 40, borderWidth: 1,
                                padding: 10,
                                borderColor: '#F0F0F0',
                                borderRadius: 5,
                                flexDirection: 'column',
                            }} placeholder='CPF' placeholderTextColor={'black'} >
                            </TextInput>
                        </View>
                        <View>
                            <Image source={require('../perfilHemocentro/imgs/localizacao.png')}></Image>
                        </View>
                    </View>


                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
                        <TextInput style={{
                            width: 335, height: 40, borderWidth: 1,
                            padding: 10,
                            borderColor: '#F0F0F0',
                            borderRadius: 5,
                        }} placeholder='CPF' placeholderTextColor={'black'} ></TextInput>
                        <TextInput style={{
                            width: 335, height: 40, borderWidth: 1,
                            padding: 10,
                            borderColor: '#F0F0F0',
                            borderRadius: 5,
                        }} placeholder='CPF' placeholderTextColor={'black'} ></TextInput>
                        <TextInput style={{
                            width: 335, height: 40, borderWidth: 1,
                            padding: 10,
                            borderColor: '#F0F0F0',
                            borderRadius: 5,
                        }} placeholder='CPF' placeholderTextColor={'black'} ></TextInput>
                        <TextInput style={{
                            width: 335, height: 40, borderWidth: 1,
                            padding: 10,
                            borderColor: '#F0F0F0',
                            borderRadius: 5,
                        }} placeholder='CPF' placeholderTextColor={'black'} ></TextInput>

                    </View>

                </View>

                <TouchableOpacity style={[styles.button]}
                    onPress={() => navigation.navigate('AgendaDisponivelHemocentro')}>
                    <Text

                        style={{ fontSize: 20, color: 'white' }}

                    >Agendamentos Disponiveis</Text>
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
                    </View>
                </ScrollView>

                <View style={{ width: '100%', paddingLeft: 20, paddingBottom: 30 }}>
                    <TouchableOpacity
                        style={[styles.button, { width: 170, height: 50, backgroundColor: "white", borderColor: "#7395F7", borderWidth: 2 }]}
                        onPress={() => setModalVisible(true)} // Abre o modal ao pressionar o botão
                    >
                        <Text style={{ fontSize: 20 }}>Avaliar</Text>
                    </TouchableOpacity>


                </View>

            </View>
            <Modal isVisible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:26, fontWeight:'300'}}>Avaliar?</Text>
                    <View style={{width:300, alignItems:'center', paddingTop:20}} >
                    <Text style={{fontSize:16, fontWeight:'300'}}>Digite a sua opinião sobre o </Text>
                    <Text style={{fontSize:16, fontWeight:'300'}}>hospital e deixe uma avaliação</Text>
                    </View>
                   
                    </View>
                    <View style={{paddingTop:20}}>
                    <TextInput style={{width:300,height:230,borderRadius:5,borderColor:'#6D6868',borderWidth:1, paddingBottom:130,paddingLeft:20,paddingRight:20, paddingTop:30}} multiline={true}></TextInput>
                    </View>
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
        height: 170,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
        paddingLeft: 10,
        paddingTop: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: '300',
        color: 'black',
    },
    image: {
        height: 300,
        width: 350,
        borderRadius: 5
    },
    nomeHemocentro: {
        fontSize: 30,
        fontWeight: '300'
    },
    informacoesHospital: {
        paddingTop: 30,
        flexDirection: 'column',
        gap: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 40
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        width: 350,
        height: 50,
        backgroundColor: "#7395F7"
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
        width:370,
        height:500
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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

