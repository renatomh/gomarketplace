import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  // Pegando o estado de produtos do contexto do carrinho
  const { products } = useCart();

  const navigation = useNavigation();

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
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
