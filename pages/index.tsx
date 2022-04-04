import { NextPage } from "next";
import { usePokemon } from "../hooks/usePokemon";
import InfiniteScroll from "react-infinite-scroller";

const typeColor = {
  grass: "bg-green-500",
  fire: "bg-red-500",
  poison: "bg-purple-500",
  flying: "bg-sky-500",
  water: "bg-blue-500",
  bug: "bg-lime-500",
  normal: "bg-amber-500",
  electric: "bg-yellow-400",
  ground: "bg-yellow-700",
  fairy: "bg-red-300",
  ghost: "bg-purple-700",
  psychic: "bg-red-400",
  steel: "bg-gray-300",
  dark: "bg-gray-500",
  fighting: "bg-red-700",
  ice: "bg-sky-300",
  rock: "bg-orange-800",
  dragon: "bg-blue-700",
};

const IndexPage: NextPage = () => {
  const { isLoading, total, pokemon, nextPage, getPokemon } = usePokemon();

  return (
    <div className="m-auto max-w-lg py-4">
      <h1 className="mb-4 text-lg font-bold">Pokemon ({total})</h1>

      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={getPokemon}
        hasMore={nextPage}
        threshold={10}
      >
        <div className="grid grid-cols-2 gap-4">
          {pokemon.map((data) => (
            <div
              key={data.id}
              className={`flex flex-col rounded-lg border bg-opacity-50 p-4 ${
                typeColor[data.types[0].type.name]
              } cursor-pointer`}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
                className="w-3/4 self-center"
              />
              <div>#{data.id}</div>
              <div className="mb-1 font-bold capitalize">{data.name}</div>
              <div className="flex gap-1">
                {data.types.map((type) => (
                  <div
                    key={data.id + type}
                    className={`rounded-xl px-2 py-0.5 text-xs text-white ${
                      typeColor[type.type.name]
                    }`}
                  >
                    {type.type.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default IndexPage;
