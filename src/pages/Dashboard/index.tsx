import React, { useState, useEffect } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { View, Image } from 'react-native';

import formatValue from '../../utils/formatValue';
import { useCart } from '../../hooks/cart';
import api from '../../services/api';

import FloatingCart from '../../components/FloatingCart';

import {
  Container,
  ProductContainer,
  ProductImage,
  ProductList,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
} from './styles';

// Definindo a tipagem para o produto
interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
}

const Dashboard: React.FC = () => {
  // Utilizando o contexto do carrinho, pegando a função para adicionar um produto
  const { addToCart } = useCart();

  // Criando o estado para armazenar os produtos
  const [products, setProducts] = useState<Product[]>([]);

  // Carregando os produtos na página
  useEffect(() => {
    async function loadProducts(): Promise<void> {
      // Retornando a listagem de produtos da API
      const response = await api.get('/products');

      // Atribuindo o retorno da chamado ao estado de produtos
      setProducts(response.data);
    }

    // Chamando a função para carregar os produtos
    loadProducts();
  }, []);

  // Adicionando os produtos ao carrinho
  function handleAddToCart(item: Product): void {
    // Recebemos o produto do tipo 'Product' e chamaos a função do contexto do carrinho
    addToCart(item);
  }

  return (
    <Container>
      <ProductContainer>
        <ProductList
          // Informando os dados a serem apresentados na lista
          data={products}
          // Definindo qual propriedade será a chave de cada item
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          // Definindo o layout para os itens da lista
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image_url }} />
              <ProductTitle>{item.title}</ProductTitle>
              <PriceContainer>
                <ProductPrice>{formatValue(item.price)}</ProductPrice>
                {/* Botão para adicionar o produto ao carrinho */}
                <ProductButton
                  testID={`add-to-cart-${item.id}`}
                  onPress={() => handleAddToCart(item)}
                >
                  <FeatherIcon size={20} name="plus" color="#C4C4C4" />
                </ProductButton>
              </PriceContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
};

export default Dashboard;
