
import React from 'react';
import HomeScreen from './pages/homeScreen/homeScreen';
import LoginScreen from './pages/loginScreen/loginScreen';
import CadastroScreen from './pages/cadastro/cadastroInformacoesPessoaisScreen/cadastro';
import CadastroTipoSanguineoScreen from './pages/cadastro/cadastroTipoSanguineo/cadastroTipoSanguineoScreen'
import CadastroEnderecoScreen from './pages/cadastro/cadastroEnderecoScreen/cadastroEndereco'
import CadastroSenhaScreen from './pages/cadastro/cadastroDeSenhaScreen/cadastroSenha';
import MeuPerfilScreen from './pages/userScreen/perfil/perfilScreen/perfilScreen';
import EditarPerfilScreen from './pages/userScreen/perfil/editarPerfilScreen/editarPerfilScreen';
import BuscaHemocentroScreen from './pages/userScreen/hemocentro/buscaHemocentroScreen/buscaHemocentroScreen'
import RedefinirSenhaScreen from './pages/userScreen/perfil/redefinirSenhaScreen/redefinirSenhaScreen'
import MainUserScreen from './pages/userScreen/mainScreen/mainScreen';
import AjudaScreen from './pages/userScreen/ajuda/ajudaScreen';
import PerfilHemocentroScreen from './pages/userScreen/hemocentro/perfilHemocentro/perfilHemocentro';
import AgendaDisponivelHemocentroScreen from './pages/userScreen/hemocentro/agendamentosDisponiveis/agendamentosDisponiveis';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroInformacoesPessoais" component={CadastroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroTipoSanguineo" component={CadastroTipoSanguineoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroEndereco" component={CadastroEnderecoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroSenha" component={CadastroSenhaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MeuPerfil" component={MeuPerfilScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BuscaHemocentro" component={BuscaHemocentroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RedefinirSenha" component={RedefinirSenhaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainUserScreen" component={MainUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AjudaScreen" component={AjudaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PerfilHemocentro" component={PerfilHemocentroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AgendaDisponivelHemocentro" component={AgendaDisponivelHemocentroScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
