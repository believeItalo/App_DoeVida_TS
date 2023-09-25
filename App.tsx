
//IMPORT BIBLIOTECAS (DRAWER e NAVIGATOR)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

//IMPORT DAS TELAS
import HomeScreen from './pages/homeScreen/homeScreen';
import LoginScreen from './pages/loginScreen/loginScreen';
import CadastroScreen from './pages/cadastro/cadastroInformacoesPessoaisScreen/cadastro';
import CadastroTipoSanguineoScreen from './pages/cadastro/cadastroTipoSanguineo/cadastroTipoSanguineoScreen';
import CadastroEnderecoScreen from './pages/cadastro/cadastroEnderecoScreen/cadastroEndereco';
import CadastroSenhaScreen from './pages/cadastro/cadastroDeSenhaScreen/cadastroSenha';
import MeuPerfilScreen from './pages/userScreen/perfil/perfilScreen/perfilScreen';
import EditarPerfilScreen from './pages/userScreen/perfil/editarPerfilScreen/editarPerfilScreen';
import BuscaHemocentroScreen from './pages/userScreen/hemocentro/buscaHemocentroScreen/buscaHemocentroScreen';
import RedefinirSenhaScreen from './pages/userScreen/perfil/redefinirSenhaScreen/redefinirSenhaScreen';
import MainUserScreen from './pages/userScreen/mainScreen/mainScreen';
import AjudaScreen from './pages/userScreen/ajuda/ajudaScreen';
import PerfilHemocentroScreen from './pages/userScreen/hemocentro/perfilHemocentro/perfilHemocentro';
import AgendaDisponivelHemocentroScreen from './pages/userScreen/hemocentro/agendamentosDisponiveis/agendamentosDisponiveis';
import QuemPodeDoarScreen from './pages/userScreen/quemPodeDoar/quemPodeDoar';
import MeusAgendamentosScreen from './pages/userScreen/perfil/meusAgendamentos/ meusAgendamentos'
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Image } from 'react-native';

//Iniciando o drawer e o stack navigator
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


//NAVIGATOR STACK

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroInformacoesPessoais" component={CadastroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroTipoSanguineo" component={CadastroTipoSanguineoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroEndereco" component={CadastroEnderecoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroSenha" component={CadastroSenhaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BuscaHemocentro" component={BuscaHemocentroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RedefinirSenha" component={RedefinirSenhaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainUserScreen" component={MainUserScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PerfilHemocentro" component={PerfilHemocentroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AgendaDisponivelHemocentro" component={AgendaDisponivelHemocentroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="QuemPodeDoar" component={QuemPodeDoarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AjudaScreen" component={AjudaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MeuPerfil" component={MeuPerfilScreen} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="MeusAgendamentos" component={MeusAgendamentosScreen} options={{headerShown:false}}></Stack.Screen>
    </Stack.Navigator>
  );
}

//DRAWER

//ESTILIZACAO DRAWER

export default function App() {
  return (
    <NavigationContainer >
      <Drawer.Navigator initialRouteName="Home" >
        <Drawer.Screen
          name=" "
          component={HomeStack}
          options={{
            headerShown:false,
            drawerStyle: {
              backgroundColor: 'white',
            },
            drawerIcon: ({ color, size }) => (
              <Image
                source={require('./pages/homeScreen/imgs/logoHomeScreen.png')}
                style={{ width: 60, height: 60 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Hemocentros"
          component={BuscaHemocentroScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="hospital" size={24} color="black" /> 
            ),
          }}
        />
         <Drawer.Screen
          name="Perfil"
          component={MeuPerfilScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="user" size={24} color="black" /> 
            ),
          }}
        />
        <Drawer.Screen
          name="Meus Agendamentos"
          component={MeusAgendamentosScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="calendar" size={24} color="black" /> 
            ),
          }}
        />
      <Drawer.Screen
          name="Quem pode doar?"
          component={QuemPodeDoarScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="calendar" size={24} color="black" /> 
            ),
          }}
        />
         <Drawer.Screen
          name="Ajuda"
          component={AjudaScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="info" size={24} color="black" /> 
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}



