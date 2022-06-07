import {useContext, useEffect, useState} from "react";

import {
  ContainerCard,
  Card,
  Title,
  LeyendDetail,
  AddButton,
  Aside,
  BuyButton,
} from "./elements/HomeEstampitas";
import api from "./api";
import {Product, ICart, CartContextType} from "./types";
import {CartContext} from "./context/CartContext";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const {cart, addCart, updateCart} = useContext(CartContext) as CartContextType;

  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  const handleAddProduct = (id: string) => {
    const findProduct = products.find((item) => item.id === id);

    if (findProduct) {
      const newItemCart: ICart = {
        ...findProduct,
        productId: findProduct.id,
        quantity: 1,
        id: Math.random(),
      };

      addCart(newItemCart);
    }
  };

  const handleUpdateProductCart = (id: number, action: boolean) => {
    updateCart(id, action);
  };

  const totalQuantity = () => {
    let totalReducer: Array<{quantity: number; price: number}> = [];

    cart?.forEach((cartItem) => {
      totalReducer = [
        ...totalReducer,
        {
          quantity: cartItem.quantity,
          price: cartItem.price,
        },
      ];
    });

    let quantityReduce = totalReducer.reduce((a, b) => a + b.quantity, 0);
    let priceReduce = totalReducer.reduce((a, b) => a + b.quantity * b.price, 0);

    return {quantityReduce, priceReduce};
  };

  return (
    <main>
      <header>Estampitiency</header>
      <ContainerCard>
        {products.map((product) => (
          <Card key={product.id}>
            <img src={product.image} />
            <div>
              <Title>{product.title}</Title>
              <LeyendDetail>{product.description}</LeyendDetail>
            </div>
            {cart?.map((cartItem: ICart) => cartItem.productId === product.id).includes(true) ? (
              cart?.map(
                (cartItem: ICart) =>
                  cartItem.productId === product.id && (
                    <div
                      key={cartItem.productId + "-quantity"}
                      style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}
                    >
                      <AddButton onClick={() => handleUpdateProductCart(cartItem.id, false)}>
                        -
                      </AddButton>
                      <AddButton disabled={true}>{cartItem.quantity}</AddButton>
                      <AddButton onClick={() => handleUpdateProductCart(cartItem.id, true)}>
                        +
                      </AddButton>
                    </div>
                  ),
              )
            ) : (
              <AddButton
                key={product.id + "-buttonBuy"}
                onClick={() => handleAddProduct(product.id)}
              >
                Agregar
              </AddButton>
            )}
          </Card>
        ))}
      </ContainerCard>
      <Aside>
        <BuyButton>
          {totalQuantity().quantityReduce === 0
            ? "Inicie su compra"
            : `${totalQuantity().quantityReduce} productos (total: $${totalQuantity().priceReduce}`}
        </BuyButton>
      </Aside>
      <footer>
        Encontrá la consigna de este ejercicio y otros más{" "}
        <a href="https://github.com/goncy/interview-challenges/tree/main/simple-cart">acá</a>
      </footer>
    </main>
  );
}

export default App;
