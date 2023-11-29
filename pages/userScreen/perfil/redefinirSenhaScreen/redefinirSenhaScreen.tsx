import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Stack = createNativeStackNavigator();

interface RedefinirSenhaScreen {
    navigation: any; // 
}
interface UserDate {
    password: any;
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

export default function RedefinirSenhaScreen({ navigation }: RedefinirSenhaScreen) {
    const [user, setUser] = useState<UserDate | null>(null)
    const [endereco, setEndereco] = useState<Address | null>(null);
    const [password, setPassword] = useState<string>(''); 
    const [confirmPassword, setConfirmPassword] = useState<string>(''); 


    useEffect(() => {
        const getUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id !== null) {
                    fetch(`http://192.168.100.100:5050/api/v1/users/${id}`)
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
    }, []);

    const handleSave = async () => {
        try {
          if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, insira senhas correspondentes.');
            return;
          }
    
          const idUser = await AsyncStorage.getItem('userId');
          const updatedPassword = {
            id: idUser,
           
              password: password,
            
          };
    
          const response = await axios.put(`http://192.168.100.100:5050/api/v1/user/redefine-password/`, updatedPassword);
    
          console.log('PUT request successful:', response.data);
          alert('Os dados foram atualizados com sucesso');
    
          // Navegar de volta para a tela "Home"
          navigation.navigate('Login');
    
        } catch (error) {
          console.error('Erro ao fazer requisição PUT:', error);
    
          
          // Adicione feedback ao usuário sobre o erro.
        }
      };


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ height: 170, width: '100%', display: 'flex', flexDirection: 'row', gap: 30, paddingLeft: 15, paddingTop: 70 }}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <FontAwesome5 name="bars" size={40} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Redefinir Senha</Text>
                    <Image source={{ uri: user?.photo }} style={{ height: 70, width: 70, borderRadius: 50 }} /></View>
                <View style={{}}>
                    <Image source={require('../redefinirSenhaScreen/imgs/imageRedefinirSenha.png')} style={{ height: 200, width: 200 }}></Image>
                </View>
                <View style={{}}>
                    <Text style={styles.titleInput}>Senha: </Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true} // Campo de senha seguro
                        value={password}
                        onChangeText={(text) => setPassword(text)} // Atualize o estado da senha
                    />
                    <Text style={styles.titleInput}>Confirmar senha</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)} // Atualize o estado da confirmação de senha
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
                        onPress={handleSave}
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