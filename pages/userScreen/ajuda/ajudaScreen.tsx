import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import ReadMoreText from './textExpand';
import { getStrings } from '../../../strings/arquivoDeStrings';
const Stack = createNativeStackNavigator();
interface AjudaScreenProps {
  navigation: any;
  route: any;
}

export default function AjudaScreen({ navigation, route }: AjudaScreenProps) {
  const [userDetails, setUserDetails] = useState(null);
  const userName = route.params && route.params.userName ? route.params.userName : '';
  const userData = route.params && route.params.userData ? route.params.userData : null;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" size={40} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{getStrings().helpTitle}</Text>
          <View >
            {userData && userData.photo && (
              <Image source={{ uri: userData.photo }} style={styles.profileImage} />
            )}
          </View>
        </View>
        <View style={styles.viewImgAjuda}>
          <Image source={require('./imgs/imgAjuda.png')}></Image>
        </View>
        <View style={styles.viewBloodText}>
          <Text style={styles.bloodText}>
            {getStrings().bloodDonationText}
          </Text>
        </View>
        <View style={styles.alignReadMoreText}>
          <ReadMoreText
            initialText={getStrings().collectionPointsContent}
            maxLength={200}
            titleWhenClosed={getStrings().collectionPointsTitle}
            titleWhenOpen={getStrings().collectionPointsTitle}
          />
          <View style={styles.lineBetweenTextBox}></View>
          <ReadMoreText
            initialText={getStrings().openingHoursContent}
            maxLength={200}
            titleWhenClosed={getStrings().openingHoursTitle}
            titleWhenOpen={getStrings().openingHoursTitle}
          />
          <View style={styles.lineBetweenTextBox}></View>
          <ReadMoreText
            initialText={getStrings().safetyContent}
            maxLength={200}
            titleWhenClosed={getStrings().safetyTitle}
            titleWhenOpen={getStrings().safetyTitle}
          />
          <View style={styles.lineBetweenTextBox}></View>
          <ReadMoreText
            initialText={getStrings().contactContent}
            maxLength={200}
            titleWhenClosed={getStrings().contactTitle}
            titleWhenOpen={getStrings().contactTitle}
            phoneNumber="(11) 92765-2364" // Adicione o número de telefone aqui
            email="doevida@gmail.com" // Adicione o endereço de email aqui
          />
          <View style={styles.lineBetweenTextBox}></View>
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
    height: '200%',
    paddingBottom: 120
  },
  bloodText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300'
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
    paddingBottom: 50
  },
  header: {
    height: 120,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: `center`,
    gap: 90,
    paddingLeft: 30,
    paddingTop: 20,
    backgroundColor: 'rgba(78, 123, 242, 0.76)'
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'white',
  },
  lineBetweenTextBox: {
    height: 1,
    width: '70%',
    backgroundColor: '#C8C8C8'
  },
  alignReadMoreText: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  viewBloodText: {
    width: '80%',
    paddingTop: 50
  },
  viewImgAjuda: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  }
});