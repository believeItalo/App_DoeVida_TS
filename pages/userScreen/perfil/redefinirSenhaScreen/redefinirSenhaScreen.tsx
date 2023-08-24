import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';
const Stack = createNativeStackNavigator();

interface RedefinirSenhaScreen {
    navigation: any; // 
}
export default function RedefinirSenhaScreen({ navigation }: RedefinirSenhaScreen) {

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ height: 170, width: '100%', display: 'flex', flexDirection: 'row', gap: 30, paddingLeft: 15, paddingTop: 70 }}>
                    <FontAwesome5 name="bars" size={40} color="black" ></FontAwesome5>
                    <Text style={styles.title}>Redefinir Senha</Text>
                    <Image source={require('../redefinirSenhaScreen/imgs/profilePicUser.png')} style={{ height: 70, width: 70 }}></Image>
                </View>
                <View style={{}}>
                    <Image source={require('../redefinirSenhaScreen/imgs/imageRedefinirSenha.png')} style={{ height: 200, width: 200 }}></Image>
                </View>
                <View style={{}}>
                    <Text style={styles.titleInput}>Senha: </Text>
                    <TextInput
                        style={styles.input}
                    />
                    <Text style={styles.titleInput}>Confirmar senha</Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <View style={{ paddingTop: 30, paddingBottom: 30, width: `100%`, display: 'flex', flexDirection: `row`, justifyContent: 'center', gap: 30 }}>
                    <TouchableOpacity
                        style={[styles.button, { width: 170, height: 50, backgroundColor: "white", borderColor: "#7395F7", borderWidth: 2 }]}
                        onPress={() => navigation.navigate('EditarPerfil')}
                    >
                        <Text style={{ fontSize: 20 }}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { width: 170, height: 50, backgroundColor: "#7395F7" }]}
                    >
                        <Text
                            style={{ fontSize: 20, color: 'white' }}

                        >Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        gap: 50,
        backgroundColor: 'white',
        paddingBottom: 20
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 180,
        paddingTop: 20,
        width: '100%'
    },
    title: {
        fontSize: 30,
        fontWeight: '300',
        color: 'black',
    },
    boxButtons: {
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        padding: 10,
        paddingTop: 20
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: '300',
        color: 'black'
    },
    input: {
        height: 40,
        width: 270,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#7395F7',
        borderRadius: 5,
    }


});