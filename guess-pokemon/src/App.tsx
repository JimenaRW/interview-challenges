import {FormEvent, useEffect, useState} from "react";
import swal from "sweetalert";

import {Pokemon} from "./types";
import api from "./api";

const initialStateCount = {
  hits: 0,
  fails: 0,
};
const pokemonStorage = JSON.parse(localStorage.getItem("GuesPokemon") as string);

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [replay, setReplay] = useState<boolean>(true);
  const [count, setCount] = useState(pokemonStorage || initialStateCount);

  useEffect(() => {
    api.random().then(setPokemon);
    setReplay(false);
  }, [replay]);

  useEffect(() => localStorage.setItem("GuesPokemon", JSON.stringify(count)), [count]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let pokemonName = document.getElementById("pok-name") as HTMLInputElement | null;
    let imagePokemon = document.querySelector(".imagePokemon") as HTMLDivElement;

    let inputValue = pokemonName?.value.replace(/[.\s]+/g, "");

    if (inputValue?.toLowerCase() === pokemon?.name) {
      imagePokemon.classList.add("visible");

      await swal({
        title: "Good job!",
        text: `Su nombre es ${pokemon?.name.toUpperCase()}!`,
        icon: "success",
        className: "nes-container",
        button: {
          className: "nes-btn is-primary",
        },
      });

      setCount({
        ...count,
        hits: ++count.hits,
      });
    } else {
      await swal({
        title: "Try again",
        text: `Estuvo cerca! Sigue intentando.`,
        icon: "error",
        className: "nes-container",
        button: {
          className: "nes-btn is-primary",
        },
      });

      setCount({
        ...count,
        fails: ++count.fails,
      });
    }
  };

  const handleReplay = () => {
    let imagePokemon = document.querySelector(".imagePokemon") as HTMLDivElement;

    imagePokemon.classList.contains("visible") && imagePokemon.classList.remove("visible");

    setReplay(true);
  };

  const handleReset = () => setCount(initialStateCount);

  return (
    <main>
      <h1>Quién es este pokemon?</h1>
      <section>
        <article>
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
            <input className="nes-input" id="pok-name" type="text" />
            <button className="nes-btn is-primary" type="submit" onClick={(e) => handleSubmit(e)}>
              Adivinar
            </button>
          </form>
          <button className="nes-btn is-success" type="submit" onClick={handleReplay}>
            Replay
          </button>
        </article>
        <aside>
          <h1>Contador</h1>
          <hr />
          <p>Aciertos: {count.hits}</p>
          <p>Fallos: {count.fails}</p>
          <hr />
          <button className="nes-btn is-warning" onClick={handleReset}>
            resetear contador
          </button>
        </aside>
      </section>
    </main>
  );
}

export default App;
