import {FormEvent, useEffect, useState} from "react";

import {Pokemon} from "./types";
import api from "./api";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    api.random().then(setPokemon);
  }, []);

  const handleVisible = (e: FormEvent) => {
    e.preventDefault();

    let imagePokemon = document.querySelector<HTMLDivElement>(".imagePokemon");

    imagePokemon.style.filter = "none";
  };

  return (
    <main>
      <h1>Quién es este pokemon?</h1>
      {pokemon ? (
        <div
          key={pokemon.id}
          className={"imagePokemon"}
          id={"PokemonId"}
          style={{backgroundImage: `url(${pokemon.image})`}}
        />
      ) : (
        <p>Cargando pokemon...</p>
      )}
      <form>
        <input className="nes-input" type="text" />
        <button className="nes-btn is-primary" type="submit" onClick={(e) => handleVisible(e)}>
          Adivinar
        </button>
      </form>
    </main>
  );
}

export default App;
