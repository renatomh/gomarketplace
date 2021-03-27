import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

// Definindo a tipagem para o produto
interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

// Definindo a tipagem para o contexto do carrinho (estados e funções)
interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

// Criando o contexto para o carrinho
const CartContext = createContext<CartContext | null>(null);

// Definindo o provider para o contexto
const CartProvider: React.FC = ({ children }) => {
  // Definindo o estado para armazenar os produtos no carrinho
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      // Carregando os produtos salvos no armazenamento local
      const storagedProducts = await AsyncStorage.getItem('@GoMarketplace:products');
      if (storagedProducts) {
        setProducts([...JSON.parse(storagedProducts)]);
      }
    }

    loadProducts();
  }, []);

  // Função para adicionar um produto ao carrinho
  const addToCart = useCallback(async product => {
    // Pegando o item recebido e verificando se o item já existe no carrinho (pelo ID)
    const productExists = products.find(p => p.id == product.id);

    // Caso já exista, apenas incrementamos o produtos
    if (productExists) {
      setProducts(
        // Mapeando os produtos já existentes e adicionando a quantidade no produto com o mesmo ID
        products.map(p =>
          // Caso tenha o mesmo ID do produto sendo adicionado
          p.id == product.id ?
            // Mantém as informações do produto já presente, alterando apenas a quandidade
            { ...product, quantity: p.quantity + 1 } :
            // Caso contrário, mantém o produto já cadastrado com a mesma quantidade
            p
        )
      )
    }
    // Caso ainda não existe
    else {
      // Adicionamos à lista de produtos
      setProducts([
        // Mantendo os produtos já presentes
        ...products,
        // Adicionando o novo produto sendo passado com a quantidade igual a 1
        { ...product, quantity: 1 }
      ])
    }

    // Salvando os produtos no armazenamento do dispositivo
    await AsyncStorage.setItem(
      '@GoMarketplace:products',
      JSON.stringify(products)
    );
  },
    // Definindo a dependência para a chamada à função 'addToCart'
    [products]);

  // Função para adicionar uma unidade do produto
  const increment = useCallback(async id => {
    // Mapeando os produtos já existentes e adicionando a quantidade no produto com o mesmo ID
    const newProducts = products.map(product =>
      // Caso tenha o mesmo ID do produto sendo adicionado
      product.id == id ?
        // Mantém as informações do produto já presente, alterando apenas a quandidade
        { ...product, quantity: product.quantity + 1 } :
        // Caso contrário, mantém o produto já cadastrado com a mesma quantidade
        product
    )

    // Atualizando os produtos no estado
    setProducts(newProducts);

    // Salvando os produtos no armazenamento do dispositivo
    await AsyncStorage.setItem(
      '@GoMarketplace:products',
      JSON.stringify(newProducts)
    );
  },
    // Dependências para a função
    [products]
  );

  // Função para reduzir uma unidade do produto
  const decrement = useCallback(async id => {
    // Pegando o produto cuja quantidade deseja-se diminuir
    const product = products.find(p => p.id == id);

    // Caso não seja encontrado, apenas finalizamos
    if (!product) return;

    // Caso seja encontrado e a quantidade seja 1
    else if (product.quantity == 1) {
      // Removemos o produto do carrinho, filtrando para retornar somente os que não possuem o ID informado
      const newProducts = products.filter(product => {
        return product.id !== id;
      })
      // Atualizando os produtos no estado
      setProducts(newProducts);
      // Salvando os produtos no armazenamento do dispositivo
      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(newProducts)
      );
    }

    // Caso seja encontrado e a quantidade seja maior que 1
    else {
      // Mapeando os produtos já existentes e adicionando a quantidade no produto com o mesmo ID
      const newProducts = products.map(product =>
        // Caso tenha o mesmo ID do produto sendo adicionado
        product.id == id ?
          // Reduzimos a quantidade
          { ...product, quantity: product.quantity - 1 } :
          // Caso contrário, mantém o produto já cadastrado com a mesma quantidade
          product
      )
      // Atualizando os produtos no estado
      setProducts(newProducts);
      // Salvando os produtos no armazenamento do dispositivo
      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(newProducts)
      );
    }
  },
    // Dependências para a função
    [products]
  );

  // Disponibilizando as funções no contexto
  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Disponibilizando o contexto para as páginas, componentes, etc.
function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
