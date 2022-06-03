import {useEffect, useState} from "react";

import { ContainerCard, Card, Title, LeyendDetail, AddButton, Aside, BuyButton} from "./elements/HomeEstampitas";

import api from "./api";
import {Product} from "./types";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.list().then(setProducts);
  }, []);

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
            <AddButton>Agregar</AddButton>
          </Card>
        ))}
      </ContainerCard>
      <Aside>
        <BuyButton>3 productos (total: $12)</BuyButton>
      </Aside>
      <footer>
        Encontrá la consigna de este ejercicio y otros más{" "}
        <a href="https://github.com/goncy/interview-challenges/tree/main/simple-cart">acá</a>
      </footer>
    </main>
  );
}

export default App;
