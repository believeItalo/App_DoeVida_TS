import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';
const Stack = createNativeStackNavigator();

interface BuscaHemocentroScreenProps {
  navigation: any; // 
}
export default function MainUserScreen({ navigation }: BuscaHemocentroScreenProps) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome5 name="bars" size={40} color="black" />
                <Text style={styles.title}>Hemocentros</Text>
                <Image source={require('../buscaHemocentroScreen/imgs/profilePicUser.png')} style={{ height: 70, width: 70 }} />
            </View>

            <View style={{ borderRadius: 10, borderColor: "#7395F7", borderWidth: 2, height: 50, width: 320 }}>
                <Text>Vou fazer a lógica depois...</Text>
            </View>

            <ScrollView>
                <View style={styles.columnCardsHemocentros}>
                    <TouchableOpacity style={styles.cardHemocentros} onPress={() => navigation.navigate('PerfilHemocentroScreen')} >
                        <View style={styles.contentCardHemocentro}>
                            <View>
                                <Image source={require('../buscaHemocentroScreen/imgs/profilePicHemocentro.png')} style={{ height: 70, width: 70 }} />
                            </View>
                            <View>
                                <Text style={styles.titleCardHemocentro}>Hospital Nova Vida</Text>
                                <Text style={styles.descriptionHemocentro}>Jardim Marilu</Text>
                                <Text>SP - CARAPICUÍBA</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.cardHemocentros} onPress={() => navigation.navigate('PerfilHemocentroScreen')} >
                        <View style={styles.contentCardHemocentro}>
                            <View>
                                <Image source={require('../buscaHemocentroScreen/imgs/profilePicHemocentro.png')} style={{ height: 70, width: 70 }} />
                            </View>
                            <View>
                                <Text style={styles.titleCardHemocentro}>Hospital Nova Vida</Text>
                                <Text style={styles.descriptionHemocentro}>Jardim Marilu</Text>
                                <Text>SP - CARAPICUÍBA</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardHemocentros} onPress={() => navigation.navigate('PerfilHemocentroScreen')} >
                        <View style={styles.contentCardHemocentro}>
                            <View>
                                <Image source={require('../buscaHemocentroScreen/imgs/profilePicHemocentro.png')} style={{ height: 70, width: 70 }} />
                            </View>
                            <View>
                                <Text style={styles.titleCardHemocentro}>Hospital Nova Vida</Text>
                                <Text style={styles.descriptionHemocentro}>Jardim Marilu</Text>
                                <Text>SP - CARAPICUÍBA</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardHemocentros} onPress={() => navigation.navigate('PerfilHemocentroScreen')} >
                        <View style={styles.contentCardHemocentro}>
                            <View>
                                <Image source={require('../buscaHemocentroScreen/imgs/profilePicHemocentro.png')} style={{ height: 70, width: 70 }} />
                            </View>
                            <View>
                                <Text style={styles.titleCardHemocentro}>Hospital Nova Vida</Text>
                                <Text style={styles.descriptionHemocentro}>Jardim Marilu</Text>
                                <Text>SP - CARAPICUÍBA</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardHemocentros} onPress={() => navigation.navigate('PerfilHemocentroScreen')} >
                        <View style={styles.contentCardHemocentro}>
                            <View>
                                <Image source={require('../buscaHemocentroScreen/imgs/profilePicHemocentro.png')} style={{ height: 70, width: 70 }} />
                            </View>
                            <View>
                                <Text style={styles.titleCardHemocentro}>Hospital Nova Vida</Text>
                                <Text style={styles.descriptionHemocentro}>Jardim Marilu</Text>
                                <Text>SP - CARAPICUÍBA</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                   
                </View>
            </ScrollView>
        </View>
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
        gap: 30,
        paddingLeft: 30,
        paddingTop: 70,
    },
    title: {
        fontSize: 30,
        fontWeight: '300',
        color: 'black',
    },
    columnCardsHemocentros: {
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
    cardHemocentros: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#7395F7',
        height: 170,
        width: 300,
    },
    contentCardHemocentro: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        gap: 20,
    },
    titleCardHemocentro: {
        fontSize: 20,
    },
    descriptionHemocentro: {
        fontSize: 14,
    },
});
