import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Importando o contexto do carrinho
import { CartProvider } from './cart';

// Centralizandos os contextos e disponibilizando para o aplicativo
const AppProvider: React.FC = ({ children }) => {
  return (
    <CartProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </CartProvider>
  );
};

export default AppProvider;
