import styled from 'styled-components/native';
import { FlatList } from 'react-native';

// Criadno a interface para a tipagem do produto
interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

// Estilizando o container da lista dos producots
export const ProductContainer = styled.View`
  border-radius: 5px;
  margin-top: 60px;
  flex: 1;
  flex-direction: row;
`;

// Estilizando a lista de producots
export const ProductList = styled(
  FlatList as new () => FlatList<Product>,
).attrs({
  numColumns: 2,
})`
  flex: 1;
  padding: 0 10px;
`;

// Estilizando o item da lista de produtos
export const Product = styled.View`
  background: #fff;
  padding: 16px 16px;
  border-radius: 5px;
  margin: 8px;
  flex: 1;
`;

// Estilizando a imagem do produto
export const ProductImage = styled.Image`
  height: 122px;
  width: 122px;
  align-self: center;
`;


// Estilizando o título do produto
export const ProductTitle = styled.Text`
  font-size: 14px;
  margin-top: 10px;
`;

// Estilizando o container do preço do produto
export const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: auto;
`;

// Estilizando o preço do produto
export const ProductPrice = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #e83f5b;
`;

// Estilizando o botão para adicionar o produto
export const ProductButton = styled.TouchableOpacity``;
