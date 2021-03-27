import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';

// Importando as rotas e os contextos para o aplicativo
import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => (
  <View style={{ backgroundColor: '#312e38', flex: 1 }}>
    {/* Utilizando os contextos para a aplicação */}
    <AppContainer>
      {/* Estilizando a barra de notificações */}
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      {/* Utilizando as rotas criadas */}
      <Routes />
    </AppContainer>
  </View>
);

export default App;
