import { NextPage } from "next";
import InfiniteScroll from "react-infinite-scroller";
import Select from "react-select";

import { usePokemonList, usePokemonType } from "../hooks/usePokemon";
import PokemonCard from "../components/PokemonCard";
import Loader from "../components/Loader";

const IndexPage: NextPage = () => {
  const {
    isLoading,
    total,
    pokemon,
    nextPage,
    getPokemon,
    getPokemonFilterByType,
  } = usePokemonList();
  const { types } = usePokemonType();

  return (
    <div className="m-auto max-w-xl py-4">
      <Select
        instanceId={"wartek-001"}
        isClearable
        placeholder="Select pokemon type..."
        options={types.map((type) => {
          return { value: type.name, label: type.name };
        })}
        onChange={(obj) =>
          obj ? getPokemonFilterByType(obj.value) : getPokemon()
        }
      />
      <h1 className="mb-4 mt-4 text-lg font-bold">Pokemon ({total})</h1>

      {isLoading && <Loader />}
      {!isLoading && pokemon.length === 0 && (
        <div className="flex justify-center p-10">No Data </div>
      )}
      {!isLoading && pokemon.length > 0 && (
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={getPokemon}
          hasMore={Boolean(nextPage)}
          threshold={10}
        >
          <div className="grid grid-cols-2 gap-4">
            {pokemon.map((data) => (
              <PokemonCard key={data.name} data={data} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default IndexPage;
