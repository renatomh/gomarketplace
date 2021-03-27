import styled from 'styled-components/native';
import { FlatList } from 'react-native';

// Definindo a tipagem com os dados do produto
interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

// Criando o container principal para não ficar por cima dos botões dos dispositivos
export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

// Estilizando o container da lista de produtos
export const ProductContainer = styled.View`
  border-radius: 5px;
  margin-top: 60px;
  flex: 1;
  flex-direction: row;
`;

// Estiliando a lista que conterá os produtos
export const ProductList = styled(FlatList as new () => FlatList<Product>)`
  /* Espaçamento vertical e horizontal entre os produtos */
  padding: 0 10px;
`;

// Estilizando o container para o produto na lista
export const Product = styled.View`
  background: #fff;
  padding: 15px 10px;
  border-radius: 5px;
  margin: 5px;
  flex-direction: row;
`;

// Estilizando a imagem do produto
export const ProductImage = styled.Image`
  height: 92px;
  width: 92px;
`;

// Estilizando o container do título do produto
export const ProductTitleContainer = styled.View`
  font-size: 16px;
  margin-left: 5px;
  /* Para nomes muito grandes, podemos utilizar o 'flex' para preencher todo o espaço */
  flex:1;
`;

// Estilizando o título do produto
export const ProductTitle = styled.Text`
  font-size: 16px;
`;

// Estilizando o container do preço do produto
export const ProductPriceContainer = styled.View`
  flex-direction: column;
`;

// Estilizando o container para o preço total do produto
export const TotalContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

// Estilizando o preço unitário do produto
export const ProductSinglePrice = styled.Text`
  font-size: 12px;
  color: #a0a0b3;
  margin-top: 8px;
`;

// Estilizando o preço total do produto
export const ProductPrice = styled.Text`
  font-weight: bold;
  margin-top: 5px;

  font-size: 16px;
  color: #e83f5b;
`;

// Estilizando a quantidade do produto
export const ProductQuantity = styled.Text`
  font-weight: bold;
  margin-top: 5px;
  margin-right: 10px;

  font-size: 16px;
  color: #e83f5b;
`;

// Container para os botões de incrementar e decrementar
export const ActionContainer = styled.View`
  align-self: flex-end;
  align-items: center;
  justify-content: space-between;

  margin-left: auto;
`;

// Botões de incrementar e decrementar
export const ActionButton = styled.TouchableOpacity`
  background: rgba(232, 63, 91, 0.1);
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 5px;
`;

// Container para a barra inferior
export const TotalProductsContainer = styled.View`
  position: absolute;
  bottom: 0px;

  flex-direction: row;
  background: #e83f5b;

  padding: 20px 40px;
  justify-content: space-between;
  align-items: center;
`;

// Texto para a quantidade total de produtos na barra inferior
export const TotalProductsText = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-left: 15px;

  flex: 1;
  font-weight: bold;
`;

// Texto para o preço total de produtos na barra inferior
export const SubtotalValue = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
