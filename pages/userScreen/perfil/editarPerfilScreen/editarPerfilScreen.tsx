import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

interface EditarPerfilScreen {
    navigation: any;
    route: any;
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

export default function EditarPerfilScreen({ navigation, route }: EditarPerfilScreen) {

    const [userDetails, setUserDetails] = useState(null);
    const userName = route.params && route.params.userName ? route.params.userName : '';
    const userData = route.params && route.params.userData ? route.params.userData : null;
    const [endereco, setEndereco] = useState<Address | null>(null);
    const [user, setUser] = useState<UserDate | null>(null)
    const [editedUser, setEditedUser] = useState<UserDate | null>(null);
    const [editedAddress, setEditedAddress] = useState<Address | null>(null);
    const [editedUserEmail, setEditedUserEmail] = useState<string>('');
    const [editedPhoneNumber, seteditedPhoneNumber] = useState<string>('');
    const [editedCEP, setEditedCep] = useState<string>('')
    const [editedWeight, setEditedWeight] = useState<string>('')
    const [editedNumber, seteditedNumber] = useState<string>('')
    const [editedComplement, setEditedComplement] = useState<string>('')

    //get dos dados do usuário 
    useEffect(() => {
        // Recupere o userId do AsyncStorage
        const getUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id !== null) {
                    // Realize a chamada à API com o userId recuperado
                    fetch(`http://10.107.144.20:8080/api/v1/users/${id}`)
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
                // Lidar com possíveis erros de leitura do AsyncStorage
                console.error('Erro ao buscar o ID do usuário do AsyncStorage:', e);
            }
        };
        getUserId();
    }, []);

    //funcao que manipula a criacao o json do put e a própria requisicao do put
    const handleSave = async () => {
        const idUser = await AsyncStorage.getItem('userId');
        const updatedUserData = {
            id: idUser,
            user: {
                name: user?.name,
                cpf: user?.cpf,
                email: editedUserEmail || (user && user.email) || '',
                phone: editedPhoneNumber || (user && user.phone || ''),
                dateOfBirth: user?.dateOfBirth,
                weight: editedWeight || (user && user.weight),
                photo: user?.photo,
                password: '1234',
                sex: user?.sex,
                bloodType: user?.bloodType
            },
            address: {
                cep: editedCEP || (endereco && endereco.cep || ' '),
                uf: endereco?.uf,
                city: endereco?.city,
                neighborhood: endereco?.neighborhood,
                street: endereco?.street,
                number: editedNumber || (endereco && endereco.number || ''),
                complement: editedComplement || (endereco && endereco.complement || '')
            }
        };

        axios.put(`http://10.107.144.20:8080/api/v1/user-update/`, updatedUserData)
            .then(response => {
                console.log('PUT request successful:', response.data);
                alert('Os dados foram atualizados com sucesso')
                // Aqui você pode adicionar algum feedback ao usuário de que o perfil foi atualizado com sucesso.
            })
            .catch(response => {
                console.log('Erro ao fazer requisição PUT:', updatedUserData);
                // Aqui você pode adicionar algum feedback ao usuário de que houve um erro ao atualizar o perfil.
            });
    };

    const handleCepChange = (text: string) => {
        setEditedCep(text);

        // Realize a chamada à API do Via CEP aqui
        axios.get(`https://viacep.com.br/ws/${text}/json/`)
            .then((response) => {
                const data = response.data;
                setEndereco({
                    uf: data.uf,
                    city: data.localidade,
                    neighborhood: data.bairro,
                    street: data.logradouro,
                    complement: data.complemento,
                    cep: text,
                    number: endereco ? endereco.number : '',
                });
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do CEP na API:', error);
            });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ paddingRight: 60, paddingLeft: 20 }}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('MainUserScreen', { userName: userData.name, userData: userData })
                            }
                        >
                            <Image source={require('../perfilScreen/imgs/setaVoltar.png')} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>
                        Meu Perfil
                    </Text>
                </View>

                <Image source={{ uri: user?.photo }} style={{ height: 100, width: 100, borderRadius: 50 }} />
                <Text style={[styles.userName]}>{user?.name}</Text>

                <View style={{ paddingTop: 40, paddingBottom: 20 }}>
                    <View style={{ backgroundColor: '#EBEBED', width: 350, height: 2 }} />
                </View>

                <View style={{ width: '100%', paddingLeft: 40 }}>
                    <Text style={{ fontSize: 20 }}>
                        Dados Pessoais
                    </Text>
                </View>
                <View style={styles.dadosPessoaisTextFields}>

                    <TextInput style={styles.input}
                        editable={false}
                        label='Nome completo'
                        value={user ? user.name : ' '}
                    />
                    <TextInput
                        style={styles.input}
                        editable={true}
                        label='E-mail'
                        value={editedUserEmail || (user && user.email) || ''}
                        onChangeText={(text) => setEditedUserEmail(text)}
                    />
                    <TextInput style={styles.input}
                        editable={true}
                        label='Telefone'
                        value={editedPhoneNumber || (user && user.phone) || ''}
                        onChangeText={(text) => seteditedPhoneNumber(text)}
                    />

                    <View style={styles.viewTextInput}>
                        <TextInput style={styles.smallInput}
                            editable={false}
                            label='Sexo'
                            value={user ? user.sex.charAt(0).toUpperCase() + user.sex.slice(1).toLowerCase() : ' '}
                        />

                        <TextInput style={styles.smallInput}
                            label='Peso'
                            value={editedWeight || (user && user.weight) || ''}
                            onChangeText={(text) => setEditedWeight(text)}
                            editable={true}
                        />

                        <TextInput style={styles.smallInput}
                            label='Idade'
                            value={user ? user.age.toString() : ' '}
                            editable={true}
                        />
                    </View>

                    <View style={styles.viewBloodType}>
                        <TextInput style={styles.bloodTypeInput}
                            label='Tipo sanguíneo'
                            value={user ? user.bloodType : ' '}
                            editable={false}
                        />
                    </View>

                    <TextInput
                        style={styles.input}
                        label='CPF'
                        value={'12345678910'}
                        editable={false}
                    />


                </View>

                <View style={{ width: '100%', paddingLeft: 40 }}>
                    <Text style={{ fontSize: 20 }}>
                        Dados Residenciais
                    </Text>
                </View>

                <View style={styles.dadosResidenciasTextFields}>


                    <TextInput
                        style={styles.input}
                        label='CEP'
                        editable={true}
                        value={editedCEP || (endereco && endereco.cep) || ''}
                        onChangeText={handleCepChange}
                    />

                    <View style={styles.viewDataInput}>
                        <TextInput style={styles.smallInputType}
                            label='Estado'
                            value={endereco ? endereco.uf : ''}
                            editable={false}
                        />

                        <TextInput style={[styles.mediumInput, styles.styleinputCidade]}
                            label='Cidade'
                            value={endereco ? endereco.city.charAt(0).toUpperCase() + endereco.city.slice(1).toLowerCase() : ' '}
                            editable={false} />

                        <TextInput style={styles.smallInputType}
                            label='Numero'
                            value={editedNumber || (endereco && endereco.number) || ''}
                            onChangeText={(text) => seteditedNumber(text)}
                            editable={true}
                        />
                    </View>
                    <TextInput style={styles.input}
                        label='Bairro'
                        value={endereco ? endereco.neighborhood : ' '}
                        editable={false}
                    />
                    <TextInput style={styles.input}
                        label='Complemento'
                        value={editedComplement || (endereco && endereco.complement) || ''}
                        onChangeText={(text) => setEditedComplement(text)}
                        editable={true}
                    />

                </View>

                <View style={styles.alignButtonSalvar}>

                    <TouchableOpacity
                        style={[styles.buttonSalvarPerfil]}
                        onPress={handleSave}

                    >
                        <Text style={{ fontSize: 20, color: 'white' }}>Salvar</Text>
                    </TouchableOpacity>
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
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 150,
        paddingTop: 10,
        gap: 12,
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
    userImage: {
        paddingTop: 0,
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    dadosResidenciasTextFields: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    styleinputCidade:{
        width:125 

    },
    input: {
        height: 60,
        width: 355,
        margin: 12,
        borderWidth: 1,
        borderColor: '#7395F7',
        borderRadius: 5,
        backgroundColor: 'white'
    },
    viewTextInput: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        paddingTop: 7
    },
    mediumInput: {
        width: 245,
        height: 60,
        borderWidth: 1,
        borderColor: '#7395F7',
        borderRadius: 5,
        backgroundColor: 'white'
    },
    smallInput: {
        width: 105,
        height: 60,
        borderWidth: 1,
        borderColor: '#7395F7',
        borderRadius: 5,
        backgroundColor: 'white',
        fontSize: 15
    },
    viewBloodType: {
        width: '100%',
        paddingLeft: 28,
        paddingTop: 15
    },

    bloodTypeInput: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#7395F7',
        borderRadius: 5,
        backgroundColor: 'white'
    },
    viewDataInput: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        paddingTop: 7
    },
    smallInputType: {
        width: 95,
        height: 60,
        borderWidth: 1,
        borderColor: '#7395F7',
        borderRadius: 5,
        backgroundColor: 'white'
    },
    buttonSalvarPerfil: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 310,
        height: 50,
        backgroundColor: "#7395F7",
    },
    alignButtonSalvar: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 30
    }
}); 