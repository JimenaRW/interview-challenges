import type {Product} from "./types";

import {useEffect, useState} from "react";

import api from "./api";

const initialStateFav = JSON.parse(localStorage.getItem("favorite") || "[]");

function Recommended() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .search()
      .then((response) =>
        setProducts(response.sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, 2)),
      );
  }, []);

  return (
    <main>
      <h1>Productos recomendados</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>$ {product.price}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

function App() {
  const [favorite, setFavorite] = useState<number[]>(initialStateFav);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    api.search(query).then(setProducts);
  }, [query]);

  const handleFav = (id: number) => {
    let copyFavorite = [...favorite];

    if (favorite.includes(id)) {
      copyFavorite = copyFavorite.filter((fav) => fav !== id);
    } else {
      copyFavorite.push(id);
    }

    setFavorite(copyFavorite);
    localStorage.setItem("favorite", JSON.stringify(copyFavorite));
  };

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {products.map((product) => (
          <li key={product.id} className={favorite.includes(product.id) ? "fav" : ""}>
            <h4>{product.title}</h4>
            <button onClick={() => handleFav(product.id)}>Fav</button>

            <p>{product.description}</p>
            <span>$ {product.price}</span>
          </li>
        ))}
      </ul>
      <hr />
      <Recommended />
    </main>
  );
}

export default App;
