import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';



export default function Campanhas() {
  return (
    <ScrollView>
    <View style={styles.cpntainerPrincipal}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.img} source={require('./img/cardapio.png')}></Image>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>Campanhas</Text>
      </View>
      <View style={styles.containerImgUser}>
        <Image style={styles.imgUser} source={require('./img/userImg.jpg')}></Image>
      </View>
    </View>

    <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.containerImgHospital}>
              <Image style={styles.imgHospital} source={require('./img/profilePicHemocentro.png')}></Image>
            </View>
            <View style={styles.containerTexto}>
              <Text style={styles.textHospital}>Hospital Notredame</Text>
              <Text style={styles.textHospital}>Intermedica</Text>
            </View>
            <View style={styles.containerCurtir}>
              <Image style={styles.imgCurtir} source={require('./img/coracao.png')}></Image>
            </View>
          </View>
          <View style={styles.linhaContainer}>
            <View style={styles.linha}></View>
          </View>
          <View>
            <Image style={styles.imgPublicidade} source={require('./img/publicidade.png')}></Image>
          </View>
        </View>
    </View>

    <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.containerImgHospital}>
              <Image style={styles.imgHospital} source={require('./img/profilePicHemocentro.png')}></Image>
            </View>
            <View style={styles.containerTexto}>
              <Text style={styles.textHospital}>Hospital Notredame</Text>
              <Text style={styles.textHospital}>Intermedica</Text>
            </View>
            <View style={styles.containerCurtir}>
              <Image style={styles.imgCurtir} source={require('./img/coracao.png')}></Image>
            </View>
          </View>
          <View style={styles.linhaContainer}>
            <View style={styles.linha}></View>
          </View>
          <View>
            <Image style={styles.imgPublicidade} source={require('./img/publicidadeDoa.png')}></Image>
          </View>
        </View>
    </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imgPublicidade:{
    width:270,
    height:270
  },
  linhaContainer:{
    //backgroundColor:"blue",
    with:100,
    height:15,
    justifyContent:"flex-start",
    alignItems:'center',
    paddingTop:5
  },
  linha:{
    width: 260,
    height: 1, // Altura da linha
    backgroundColor: '#BDBDBD', 
  },
  imgCurtir:{
    height:40,
    width:40
  },
  containerCurtir:{
    width:112,
    height:100,
    //backgroundColor:"orange",
    alignItems:"flex-end",
    paddingRight:15,
    paddingTop:10
  },
  textHospital:{
    fontSize:13
  },
  containerTexto:{
  //  width:"500",
    height:100,
   // backgroundColor:"green",
    justifyContent:"center",
    paddingBottom:20
  },
  imgHospital:{
    width:45,
    height:45
  },
  containerImgHospital:{
    width:70,
    height:80,
    justifyContent:"center",
    alignItems:"center",
    paddingLeft:10
    
  },
  cardHeader:{
    width:"100%",
    height:70,
    flexDirection:"row"
  },
  cardContainer: {
    height: 500,
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  card: {
    width:300,
    height:380,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    elevation: 15, // elevação da sombra no Android,
    shadowColor: 'blue', // cor da sombra no iOS
    backgroundColor:"white",
    alignItems:"center"
  },
  cpntainerPrincipal: {

    width:"100%",
    height:"100%",
  },
  container: {
    height:110,
    backgroundColor: '#4E7BF2',
    display:"flex",
    flexDirection:"row",
  },
  header: {

    width:100,
    display:'flex',
    justifyContent:'center',
    alignItems:"center",
    paddingRight:30,
    paddingTop:15
  },
  img:{
    width:30,
    height:30,
  },
  containerText:{

    width:200,
    height:110,
    justifyContent:"center",
    alignItems:"center",
    paddingTop:15,
    paddingRight:20
  },
  text:{
    color:"white",
    fontSize:25,
  },
  containerImgUser: {
   // backgroundColor:"purple",
    height:110,
    width:100,
    justifyContent:"center",
    paddingTop:15,
    paddingLeft:15
  },
  imgUser:{
    width:50,
    height:50,
    borderRadius:50
  },
  

});
