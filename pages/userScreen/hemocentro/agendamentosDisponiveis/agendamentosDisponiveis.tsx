import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, } from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import { getStrings } from '../../../../strings/arquivoDeStrings'

interface AgendaDisponivelHemocentroScreenProps {
  navigation: any;
  route:any;
}

export default function AgendaDisponivelHemocentro({ navigation, route }: AgendaDisponivelHemocentroScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const userName = route.params && route.params.userName ? route.params.userName : '';
  const userData = route.params && route.params.userData ? route.params.userData : null;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" size={40} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{getStrings().hemocentroTitle}</Text>
          <View >
                        {userData && userData.photo && (
                            <Image source={{ uri: userData.photo }} style={styles.profileImage} />
                        )}
                    </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../perfilHemocentro/imgs/hemocentroPic.png')}
            style={styles.image}
          />
          <Image
            source={require('../perfilHemocentro/imgs/sliderLength.png')}
          />
        </View>
        <View style={styles.nomeHemocentroContainer}>
          <Text style={styles.nomeHemocentro}>{getStrings().hospitalName}</Text>
        </View>
        <View style={styles.agendaTitleContainer}>
          <Text style={styles.agendaTitle}>{getStrings().agendaTitle}</Text>
        </View>
        <View style={styles.cardsContainer}>
          <View style={styles.cardAgenda}>
            <TouchableOpacity style={styles.contentCardAgenda}>
              <View style={styles.cardInfoRow}>
                <Text style={styles.titleCardAgenda}>Data:</Text>
                <Text style={styles.descriptionCardAgenda}>
                  18/09/2023 às 13:30
                </Text>
              </View>
              <View style={styles.cardInfoColumn}>
                <Text style={styles.titleCardAgenda}>Local de doação:</Text>
                <Text style={styles.descriptionCardAgenda}>
                  Descricao de local de doacao 1
                </Text>
              </View>
              <View style={styles.agendarButtonContainer}>
                <TouchableOpacity style={styles.agendarButton} onPress={() => setModalVisible(true)}>
                  <Text style={styles.agendarButtonText}>{getStrings().agendaTitle}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal isVisible={modalVisible} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 300, height: 250, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', gap: 40 }}>
          <View style={{ alignItems: 'center', gap: 40 }}>
            <Text style={{ fontSize: 20 }}>{getStrings().confirmAgendaText}</Text>
            <Text style={{ fontSize: 16, color: '#6D6868' }}>{getStrings().confirmAgendaDescription}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 50, justifyContent: 'center' }}>
            <TouchableOpacity style={{ width: 100, height: 50, backgroundColor: '#98E768', alignItems: 'center', justifyContent: 'center', borderRadius: 5, flexDirection: 'row', gap: 20 }}>
              <Text style={{ color: 'white', marginLeft: 5, fontSize: 16 }}>{getStrings().yesButtonText}</Text>
              <FontAwesome5 name="check" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 100, height: 50, backgroundColor: '#EE5353', alignItems: 'center', justifyContent: 'center', borderRadius: 5, flexDirection: 'row', gap: 20 }} onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'white', marginLeft: 5, fontSize: 16 }}>{getStrings().noButtonText}</Text>
              <FontAwesome5 name="times" size={20} color="white" />
            </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  profileImage: {
    height: 70,
    width: 70,
  },
  imageContainer: {
    width: 400,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20,
  },
  image: {
    height: 300,
    width: 350,
    borderRadius: 5,
  },
  nomeHemocentroContainer: {
    paddingTop: 50,
  },
  nomeHemocentro: {
    fontSize: 30,
    fontWeight: '300',
  },
  agendaTitleContainer: {
    width: '100%',
    paddingLeft: 20,
    paddingTop: 30,
  },
  agendaTitle: {
    fontSize: 24,
  },
  cardsContainer: {
    paddingBottom: 40,
    paddingTop: 20,
    gap: 15,
  },
  cardAgenda: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#7395F7',
    height: 230,
    width: 300,
  },
  contentCardAgenda: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    paddingTop: 30,
    paddingLeft: 20,
  },
  cardInfoRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  titleCardAgenda: {
    fontSize: 18,
  },
  descriptionCardAgenda: {
    fontSize: 16,
    fontWeight: '300',
  },
  cardInfoColumn: {
    flexDirection: 'column',
    gap: 10,
  },
  agendarButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingRight: 20,
  },
  agendarButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    width: 100,
    height: 60,
    backgroundColor: '#2C62F1',
  },
  agendarButtonText: {
    color: 'white',
  },
});


