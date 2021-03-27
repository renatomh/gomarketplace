import styled from 'styled-components/native';

// Estilização para o container da barra inferior
export const Container = styled.View`
  position: absolute;
  bottom: 0px;

  flex-direction: row;
  background: #e83f5b;

  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
`;

// Estilização do preço na barra inferior
export const CartPricing = styled.Text`
  padding: 20px;
`;

// Estilização do preço total na barra inferior
export const CartTotalPrice = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

// Estilização do botão para acessar o carrinho
export const CartButton = styled.TouchableOpacity`
  flex-direction: row;
  background: #e83f5b;

  flex: 1;
  padding: 20px 20px;
  justify-content: space-between;
  align-items: center;
`;

// Estilização da quantidade de itens na barra inferior
export const CartButtonText = styled.Text`
  font-weight: bold;
  color: #fff;
  margin-left: 15px;
  flex: 1;
  margin-right: auto;
`;
