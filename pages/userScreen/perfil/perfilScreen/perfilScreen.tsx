import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';


export default function MeuPerfilScreen() {


    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{ paddingRight: 60, paddingLeft: 20 }}>
                        <TouchableOpacity
                           >
                            <Image source={require('../perfilScreen/imgs/setaVoltar.png')} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>
                        Meu Perfil
                    </Text>
                </View>

                <Image source={require('../perfilScreen/imgs/profilePic.png')} style={{ height: 100, width: 100 }} />
                <Text style={styles.userName}>
                    João Pedro
                </Text>

                <TouchableOpacity
                    style={[styles.buttonEditarPerfil]}
                    
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>Editar Perfil</Text>
                </TouchableOpacity>

                <View style={{ paddingTop: 40, paddingBottom: 20 }}>
                    <View style={{ backgroundColor: '#EBEBED', width: 350, height: 2 }} />
                </View>

                <View style={{ width: '100%', paddingLeft: 40 }}>
                    <Text style={{ fontSize: 20 }}>
                        Dados Pessoais
                    </Text>
                </View>
                <View style={styles.dadosPessoaisTextFields}>

                    <TextInput style={styles.input} keyboardType='email-address' />
                    <TextInput style={styles.input} keyboardType='email-address' />
                    <TextInput style={styles.input} keyboardType='email-address' />

                    <View style={{ display: 'flex', flexDirection: 'row', gap: 20, paddingTop: 7 }}>
                        <TextInput style={{
                            width: 100, height: 40, borderWidth: 1,
                            padding: 10,
                            borderColor: '#7395F7',
                            borderRadius: 5,
                        }} keyboardType='email-address' />

                        <TextInput style={{
                            width: 70, height: 40, borderWidth: 1,
                            padding: 10,
                            borderColor: '#7395F7',
                            borderRadius: 5,
                        }} keyboardType='email-address' />

                        <TextInput style={{
                            width: 100, height: 40, borderWidth: 1,
                            padding: 10,
                            borderColor: '#7395F7',
                            borderRadius: 5,
                        }} keyboardType='email-address' />
                    </View>

                    <View style={{ width: '100%', paddingLeft: 52, paddingTop: 15 }}>
                        <TextInput style={{
                            width: 100, height: 100, borderWidth: 1,
                            padding: 10,
                            borderColor: '#7395F7',
                            borderRadius: 5,
                        }} keyboardType='email-address' />

                    </View>

                    <TextInput style={styles.input} keyboardType='email-address' />


                </View>

                <View style={{ width: '100%', paddingLeft: 40 }}>
                    <Text style={{ fontSize: 20 }}>
                        Dados Residenciais
                    </Text>
                </View>

                <View style={styles.dadosResidenciasTextFields}>

                    <TextInput style={styles.input} keyboardType='email-address' />

                    <View style={{ display: 'flex', flexDirection: 'row', gap: 20, paddingTop: 7 }}>
                        <TextInput style={{
                            width: 70, height: 40, borderWidth: 1,
                            padding: 10,
                            borderColor: '#7395F7',
                            borderRadius: 5,
                        }} keyboardType='email-address' />

                        <TextInput style={{
                            width: 220, height: 40, borderWidth: 1,
                            padding: 10,
                            borderColor: '#7395F7',
                            borderRadius: 5,
                        }} keyboardType='email-address' />
                    </View>
                    <TextInput style={styles.input} keyboardType='email-address' />
                    <TextInput style={styles.input} keyboardType='email-address' />

                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        paddingBottom: 50,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 180,
        paddingTop: 10,
        width: '100%',
    },
    title: {
        fontSize: 30,
        fontWeight: '300',
        color: 'black',
    },
    userName: {
        fontSize: 30,
        fontWeight: '400',
        color: 'black',
        paddingTop: 20,
        paddingBottom: 20,
    },
    buttonEditarPerfil: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        backgroundColor: "#7395F7",
    },
    dadosPessoaisTextFields: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    dadosResidenciasTextFields: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    input: {
        height: 40,
        width: 310,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#7395F7',
        borderRadius: 5,
    },
});
