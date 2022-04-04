import { useState, useEffect } from "react";

export const usePokemon = () => {
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
        const promisesArray = results.map((result) => {
          return fetch(result.url).then((response) => response.json());
        });
        return Promise.all(promisesArray);
      })
      .then((data) => setPokemon([...pokemon, ...data]))
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
  };
};
