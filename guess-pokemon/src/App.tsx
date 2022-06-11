import {FormEvent, useEffect, useState} from "react";
import swal from "sweetalert";

import {Pokemon} from "./types";
import api from "./api";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [replay, setReplay] = useState<boolean>(true);

  useEffect(() => {
    api.random().then(setPokemon);
    setReplay(false);
  }, [replay]);

  const handleVisible = async (e: FormEvent) => {
    e.preventDefault();

    let pokemonName = document.getElementById("pok-name") as HTMLInputElement | null;
    let imagePokemon = document.querySelector(".imagePokemon") as HTMLDivElement;

    imagePokemon.classList.add("visible");

    let inputValue = pokemonName?.value.replace(/[.\s]+/g, "");

    if (inputValue?.toLowerCase() === pokemon?.name) {
      await swal({
        title: "Good job!",
        text: `Su nombre es ${pokemon?.name}!`,
        icon: "success",
        className: "nes-container",
      });
    } else {
      await swal({
        title: "Try again",
        text: `Su nombre es ${pokemon?.name}!`,
        icon: "error",
        className: "nes-container",
      });
    }
  };

  const handleReplay = () => {
    let imagePokemon = document.querySelector(".imagePokemon") as HTMLDivElement;

    imagePokemon.classList.remove("visible");

    setReplay(true);
  };

  return (
    <main>
      <h1>Quién es este pokemon?</h1>
      {pokemon ? (
        <>
          <div
            key={pokemon.id}
            className={"imagePokemon"}
            id={"PokemonId"}
            style={{backgroundImage: `url(${pokemon.image})`}}
          />
          <button className="nes-btn is-primary" type="submit" onClick={handleReplay}>
            Replay
          </button>
        </>
      ) : (
        <p>Cargando pokemon...</p>
      )}
      <form>
        <input className="nes-input" id="pok-name" type="text" />
        <button className="nes-btn is-primary" type="submit" onClick={(e) => handleVisible(e)}>
          Adivinar
        </button>
      </form>
    </main>
  );
}

export default App;
