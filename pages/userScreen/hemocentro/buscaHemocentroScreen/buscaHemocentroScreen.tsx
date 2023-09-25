import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Card, IconButton } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {getStrings} from '../../../../strings/arquivoDeStrings'
import axios from 'axios';
interface BuscaHemocentroScreenProps {
  navigation: any;
}
type MainUserScreenProps = {
  navigation: DrawerNavigationProp<{}>;
}

export default function MainUserScreen({ navigation }: BuscaHemocentroScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [hospitals, setHospitals] = useState([]);
  

  const hemocentros = [ 
    { id: 1, title: 'Hospital Nova Vida', location: 'Jardim Marilu, SP - CARAPICUÍBA' },
    { id: 2, title: 'Outro Hemocentro', location: 'Outra Localização' },
    { id: 3, title: 'Hospital NotreDame', location: 'SP - JANDIRA' },
    { id: 4, title: 'Hospital Teste', location: 'SP - OSASCO' },
    { id: 5, title: 'Hospital Ranca Sangue', location: 'SP - JANDIRA' },
    { id: 6, title: 'Hospital Extrai Sangue', location: 'SP - BARUERI' },
    { id: 7, title: 'Hospital Vermelho', location: 'SP - ITAPEVI' }
  ];

  const filteredHemocentros = hemocentros.filter(hemocentro =>
    hemocentro.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" size={40} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{getStrings().hemocentroTitle}</Text>
          <Image source={require('../buscaHemocentroScreen/imgs/profilePicUser.png')} style={{ height: 70, width: 70 }} />
        </View>
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={18} color="#7395F7" />
        <TextInput
          placeholder="Buscar hemocentro"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchBar}
        />
      </View>

      <ScrollView>
        <View style={styles.columnCardsHemocentros}>
          {filteredHemocentros.map(hemocentro => (
            <TouchableOpacity
              style={styles.cardHemocentros}
              onPress={() => navigation.navigate('PerfilHemocentro')}
              key={hemocentro.id}
            >
              <View style={styles.contentCardHemocentro}>
                <View>
                  <Image source={require('../buscaHemocentroScreen/imgs/profilePicHemocentro.png')} style={{ height: 70, width: 70 }} />
                </View>
                <View>
                  <Text style={styles.titleCardHemocentro}>{hemocentro.title}</Text>
                  <Text style={styles.descriptionHemocentro}>{hemocentro.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    alignItems: `center`,
    gap: 40,
    paddingLeft: 30,
    paddingTop: 20,
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
  searchBar: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#7395F7',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: 300,
    height: 40,
    gap: 20,
  },
});
