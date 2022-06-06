import {useEffect, useState} from "react";

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
import {Product, Cart} from "./types";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  const handleAddProduct = (id: string) => {
    let copyCart = [...cart];

    let newProduct = {
      id,
      quantity: 1,
    };

    copyCart = copyCart.concat(newProduct);
    setCart(copyCart);
  };
  const handleAddToCart = (id: string) => {
    let copyCart = [...cart];

    let productUpdate = copyCart.find((item) => item.id === id);

    productUpdate &&
      copyCart.map((item) => (item.id === id ? (item.quantity = item.quantity + 1) : item));

    setCart(copyCart);
  };
  const handleSubtractToCart = (id: string) => {
    let copyCart = [...cart];

    let productUpdate = copyCart.find((item) => item.id === id);

    productUpdate && productUpdate.quantity - 1 !== 0
      ? copyCart.map((item) => (item.id === id ? (item.quantity = item.quantity - 1) : item))
      : (copyCart = copyCart.filter((item) => item.id !== id));

    setCart(copyCart);
  };
  const totalQuantity = () => {
    let totalReducer = [];
    
    products.forEach(item => {
      cart.forEach(cartItem => {
        if (item.id === cartItem.id) {
          totalReducer = [
            ...totalReducer,
            {
              quantity: cartItem.quantity, 
              price: item.price
            }
          ]
        }
      })
    })

    let quantityReduce = totalReducer.reduce((a,b) => a + b.quantity, 0);
    let priceReduce = totalReducer.reduce((a,b) => a + b.quantity * b.price, 0)

    return {quantityReduce, priceReduce}
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
            {cart.map((el) => el.id === product.id).includes(true) ? (
              <div style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <AddButton onClick={() => handleSubtractToCart(product.id)}>-</AddButton>
                {cart.map(
                  (el) =>
                    el.id === product.id && (
                      <AddButton disabled key={product.id + "quantity"}>{el.quantity}</AddButton>
                    ),
                )}
                <AddButton onClick={() => handleAddToCart(product.id)}>+</AddButton>
              </div>
            ) : (
              <AddButton key={product.id + "button"} onClick={() => handleAddProduct(product.id)}>
                Agregar
              </AddButton>
            )}
          </Card>
        ))}
      </ContainerCard>
      <Aside>
        <BuyButton>
        {totalQuantity().quantityReduce === 0 ? 
          ('Inicie su compra') : 
          (`${totalQuantity().quantityReduce} productos (total: $${totalQuantity().priceReduce})`)
      }
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
