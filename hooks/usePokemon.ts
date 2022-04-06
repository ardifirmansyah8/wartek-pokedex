import { useState, useEffect } from "react";
import { PokemonDetail, PokemonList, PokemonType } from "../types/Pokemon";

export const usePokemonList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [nextPage, setNextPage] = useState("");

  const getPokemon = () => {
    setIsLoading(true);

    fetch(nextPage ? nextPage : "https://pokeapi.co/api/v2/pokemon?limit=40")
      .then((response) => response.json())
      .then((data) => {
        setTotal(data.count);
        setNextPage(data.next);
        const results = data.results;
        const promisesArray = results.map((result: PokemonList) => {
          return fetch(result.url).then((response) => response.json());
        });
        return Promise.all(promisesArray);
      })
      .then((data) => {
        setPokemon(nextPage ? [...pokemon, ...data] : data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  };

  const getPokemonFilterByType = (type: string) => {
    console.log(type);
    setIsLoading(true);

    fetch("https://pokeapi.co/api/v2/type/" + type)
      .then((response) => response.json())
      .then((data) => {
        const results = data.pokemon;
        setTotal(results.length);
        setNextPage("");
        const promisesArray = results.map(
          (result: { pokemon: PokemonList }) => {
            return fetch(result.pokemon.url).then((response) =>
              response.json()
            );
          }
        );
        return Promise.all(promisesArray);
      })
      .then((data) => {
        setPokemon(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return {
    isLoading,
    total,
    pokemon,
    nextPage,
    getPokemon,
    getPokemonFilterByType,
  };
};

export const usePokemonDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState<PokemonDetail>(null);

  const getPokemonDetail = (pokemon: string) => {
    setIsLoading(true);

    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
      .then((response) => response.json())
      .then((data) => {
        setDetail(data);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    detail,
    getPokemonDetail,
  };
};

export const usePokemonType = () => {
  const [types, setTypes] = useState<PokemonType[]>([]);

  const getPokemonTypes = () => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((response) => response.json())
      .then((data) => {
        setTypes(data.results);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getPokemonTypes();
  }, []);

  return { types };
};
