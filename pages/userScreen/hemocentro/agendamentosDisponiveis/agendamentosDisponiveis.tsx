import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';


const Stack = createNativeStackNavigator();

interface AgendaDisponivelHemocentroScreenProps {
    navigation: any; // 
}

export default function AgendaDisponivelHemocentro({ navigation }: AgendaDisponivelHemocentroScreenProps) {

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

                <View style={{ width: '100%', paddingLeft: 20, paddingTop: 30 }}>
                    <Text style={{ fontSize: 24 }}>
                        Agenda Disponível
                    </Text>
                </View>
                <View style={{paddingBottom:40, paddingTop:50 }}>
                    <View style={{
                        borderWidth: 2,
                        borderRadius: 10,
                        borderColor: '#7395F7',
                        height: 200,
                        width: 300,
                    }}>

                        <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', gap: 10, paddingTop: 40, paddingLeft:20}}>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 18 }}>
                                    Data:
                                </Text>
                                <Text >
                                    18/09/2023 às 13:30
                                </Text>

                            </View>
                            <View style={{ flexDirection: 'column', gap: 10 }}>
                                <Text style={{ fontSize: 18 }}>
                                    Local de doação:
                                </Text>
                                <Text style={{ width: '100%' }}>
                                    Descricao de local de doacao 1
                                </Text>
                            </View>


                            <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom:30, paddingRight:20}}>


                                <TouchableOpacity style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 10,
                                    borderRadius: 5,
                                    width: 90,
                                    height: 50,
                                    backgroundColor: "#7395F7"
                                }}>
                                        <Text style={{color:'white'}}>AGENDAR</Text>
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>

            </View>

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
    }

});
