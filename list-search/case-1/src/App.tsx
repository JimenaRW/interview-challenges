import type {Product} from "./types";

import {SetStateAction, useEffect, useState} from "react";

import api from "./api";
import {
  sortArrayTitleAsc,
  sortArrayTitleDesc,
  sortArrayPriceAsc,
  sortArrayPriceDesc,
  sortArrayDefault,
} from "./utils/sortArray";

//La query y la preferencia de orden deberían persistirse al recargar la página.
const initalStateQueryPersist = JSON.parse(localStorage.getItem("queryPersist") || "");
const initalStateOrderPersist = JSON.parse(localStorage.getItem("orderPersist") || "0");

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(initalStateQueryPersist);
  const [order, setOrder] = useState<string>(initalStateOrderPersist);
  const [isLoadding, setIsLoadding] = useState(false);

  useEffect(() => {
    setIsLoadding(false);

    api.search(query).then((response) => {
      handleSelectChange(response);
      setIsLoadding(true);
    });
  }, [query]);

  useEffect(() => {
    handleSelectChange(products);
  }, [order]);

  const handleSelectChange = (prod: Product[]) => {
    let result = [];
    const copyProducts = [...prod];

    switch (order) {
      case "1":
        result = copyProducts.sort(sortArrayTitleAsc);
        break;
      case "2":
        result = copyProducts.sort(sortArrayTitleDesc);
        break;
      case "3":
        result = copyProducts.sort(sortArrayPriceAsc);
        break;
      case "4":
        result = copyProducts.sort(sortArrayPriceDesc);
        break;
      case "0":
        result = copyProducts.sort(sortArrayDefault);
        break;
      default:
        result = copyProducts.sort(sortArrayDefault);
        break;
    }

    setProducts(result);
  };

  const handleQuery = (value: SetStateAction<string>) => {
    localStorage.setItem("queryPersist", JSON.stringify(value));
    setQuery(value);
  };

  const handleOrder = (value: SetStateAction<string>) => {
    localStorage.setItem("orderPersist", JSON.stringify(value));
    setOrder(value);
  };

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input
        name="text"
        placeholder="tv"
        type="text"
        value={query}
        onChange={(e) => handleQuery(e.target.value)}
      />
      <h2>Filtrar</h2>
      <select name="order" value={order} onChange={(e) => handleOrder(e.target.value)}>
        <option value="0">---</option>
        <option value="1">Titulo ascendente</option>
        <option value="2">Titulo descendente</option>
        <option value="3">Precio menor a mayor</option>
        <option value="4">Precio mayor a menor</option>
      </select>
      <ul>
        {isLoadding ? (
          products.map((product) => (
            <li key={product.id} className={product.price <= 100 ? "sale" : ""}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price.toLocaleString("es-AR")}</span>
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
