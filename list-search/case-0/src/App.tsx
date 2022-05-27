import type {Product} from "./types";

import {useEffect, useState} from "react";

import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoadding, setIsLoadding] = useState(false);

  useEffect(() => {
    setIsLoadding(false);
    Promise.resolve(api.search(query)).then((resolve) => {
      setProducts(resolve);
      setIsLoadding(true);
    });
  }, [query]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {isLoadding ? (
          products.map((product) => (
            <li key={product.id} className={product.price <= 100 ? "sale" : ""}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
            </li>
          ))
        ) : (
          <span>Cargando catálogo...</span>
        )}
      </ul>
    </main>
  );
}

export default App;
