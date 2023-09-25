import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
interface MeusAgendamentosProps {
    navigation: any;
}
const HomeScreen: React.FC<MeusAgendamentosProps> = ({ navigation }) => {

    return (
        <View>
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
            <View>
                <View style={styles.viewCardsAgendamentos}>
                    <View style={styles.cardAgendamentos}>

                    </View>
                </View>
            </View>
        </View>
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
        gap: 50,
        paddingLeft: 10,
        paddingTop: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '300',
        color: 'black',
    },
    viewTextHeader:{
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      width:180
    },
    cardAgendamentos:{
        width:'70%',
        height:'60%',
        backgroundColor:'red',
        borderRadius:20
    },
    viewCardsAgendamentos:{
        width:'100%',
        alignItems:'center'
    },
    viewCardsImages:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
});

export default HomeScreen;