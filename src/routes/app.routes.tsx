import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import Cart from '../pages/Cart';

import Logo from '../assets/logo.png';

// Criando o navegador para as telas do aplicativo
const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      // Exibindo o cabeçalho
      headerShown: true,
      // Definindo a cor de fundo das telas
      cardStyle: { backgroundColor: '#EBEEF8' },
    }}
    // Definindo a rota inicial
    initialRouteName="Dashboard"
  >
    {/* Criando a tela principal, de seleção dos produtos */}
    <App.Screen
      options={{
        // Deixando o cabeçalho transparente
        headerTransparent: true,
        // Definindo a imagem para o cabeçalho
        headerTitle: () => <Image source={Logo} />,
      }}
      name="Dashboard"
      component={Dashboard}
    />
    {/* Criando a tela do carrinho */}
    <App.Screen
      options={{
        // Deixando o cabeçalho transparente
        headerTransparent: true,
        // Definindo a imagem para o cabeçalho
        headerTitle: () => <Image source={Logo} />,
        // Habilitando o botão para voltar para a página anterior
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
        headerBackImage: () => <FeatherIcon name="chevron-left" size={24} />,
      }}
      name="Cart"
      component={Cart}
    />
  </App.Navigator>
);

export default AppRoutes;
