import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { View } from 'react-native';

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
} from './styles';

// Importando o contexto do carrinho
import { useCart } from '../../hooks/cart';

import formatValue from '../../utils/formatValue';

// Interface com tipagem para o produto
interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  // Obtendo as funções e o estado dos produtos a partir do contexto do carrinho
  const { increment, decrement, products } = useCart();

  // Função para acrescentar uma unidade ao produto no carrinho
  function handleIncrement(id: string): void {
    // Chamando a função para acrescenter o produto ao carrinho
    increment(id);
  }

  // Função para remover uma unidade do produto no carrinho
  function handleDecrement(id: string): void {
    // Chamando a função para reduzir o produto do carrinho
    decrement(id);
  }

  // Função para obter o preço de todos os produtos do carrinho
  // o 'useMemo' recalcula o valor quando uma das dependências é modificada
  const cartTotal = useMemo(() => {
    // Pegando o preço total, percorrendo cada produto
    const total = products.reduce((accumulator, product) => {
      // Pegando o subtotal de cada item
      const productsSubtotal = product.price * product.quantity;
      return accumulator + productsSubtotal;
    },
      // Definindo o valor inicial para o acumulador
      0
    );

    // Retornando o valor total calculado (já formatado como moeda)
    return formatValue(total);
  }, [products]);

  // Função para obter a quantidade de produtos no carrinho
  // o 'useMemo' recalcula o valor quando uma das dependências é modificada
  const totalItensInCart = useMemo(() => {
    // Pegando a quantidade total de produtos no carrinho
    const total = products.reduce((accumulator, product) => {
      // Pegando a quantidade de cada item
      const productsQuantity = product.quantity;
      return accumulator + productsQuantity;
    },
      // Definindo o valor inicial para o acumulador
      0
    );

    // Retornando a quantidade total calculada
    return total;
  }, [products]);

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
          renderItem={({ item }: { item: Product }) => (
            <Product>
              <ProductImage source={{ uri: item.image_url }} />
              <ProductTitleContainer>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPriceContainer>
                  <ProductSinglePrice>
                    {formatValue(item.price)}
                  </ProductSinglePrice>

                  <TotalContainer>
                    <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                    <ProductPrice>
                      {formatValue(item.price * item.quantity)}
                    </ProductPrice>
                  </TotalContainer>
                </ProductPriceContainer>
              </ProductTitleContainer>
              <ActionContainer>
                <ActionButton
                  testID={`increment-${item.id}`}
                  onPress={() => handleIncrement(item.id)}
                >
                  <FeatherIcon name="plus" color="#E83F5B" size={16} />
                </ActionButton>
                <ActionButton
                  testID={`decrement-${item.id}`}
                  onPress={() => handleDecrement(item.id)}
                >
                  <FeatherIcon name="minus" color="#E83F5B" size={16} />
                </ActionButton>
              </ActionContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <TotalProductsContainer>
        <FeatherIcon name="shopping-cart" color="#fff" size={24} />
        <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>
    </Container>
  );
};

export default Cart;
