import React from 'react';
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
}

export default function AjudaScreen({ navigation }: AjudaScreenProps) {

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./imgs/menu.png')}></Image>
          <Text style={styles.title}>{getStrings().helpTitle}</Text>
          <Image source={require('../ajuda/imgs/profilePicUser.png')} style={{ height: 70, width: 70 }} />
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
  },
  bloodText:{
    fontSize:20,
    textAlign:'center',
    fontWeight:'300'
  },
  titleCadastroScreen: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 70,
    paddingBottom: 50
  },
  header: {
    height: 170,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: `center`,
    gap: 90,
    paddingLeft: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'black',
  },
  lineBetweenTextBox:{
     height:1,
     width:'70%',
     backgroundColor:'#C8C8C8'
    },
    alignReadMoreText:{
      alignItems:'center',
      justifyContent:'center',
      width:'100%'
    },
    viewBloodText:{
      width:'80%'
    },
    viewImgAjuda:{
      width:'100%',
      height:'15%',
      alignItems:'center',
      justifyContent:'center'
    }
});