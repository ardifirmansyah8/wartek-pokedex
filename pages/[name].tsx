import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { usePokemonDetail } from "../hooks/usePokemon";

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

const PokemonPage: NextPage = () => {
  const router = useRouter();

  const { detail, getPokemonDetail } = usePokemonDetail();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (router.query.name) getPokemonDetail(router.query.name as string);
  }, [router.query.name]);

  if (!detail) {
    return null;
  }

  console.log(detail);

  return (
    <div className="m-auto max-w-xl">
      <div
        className={`flex flex-col bg-opacity-50 ${
          typeColor[detail.types[0].type.name]
        }`}
      >
        <div className="py-4 px-6">
          <ArrowLeftIcon
            className="mb-4 h-6 w-6 cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="text-xl font-bold">#{detail.id}</div>
          <div className="mb-2 text-2xl font-bold capitalize">
            {detail.name}
          </div>
          <div className="flex gap-1">
            {detail.types.map((type) => (
              <div
                key={type.type.name}
                className={`rounded-xl px-2 py-0.5 text-xs text-white ${
                  typeColor[type.type.name]
                }`}
              >
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detail.id}.png`}
          className="w-7/12 self-center"
        />
        <div className="rounded-t-3xl bg-white p-6">
          <Tabs>
            <TabList className="flex border-none">
              <Tab
                selectedClassName="border-b-2 border-b-blue-400 text-black pb-3"
                className="mr-3 cursor-pointer text-sm font-bold text-gray-400 outline-0"
              >
                About
              </Tab>
              <Tab
                selectedClassName="border-b-2 border-b-blue-400 text-black pb-3"
                className="cursor-pointer text-sm font-bold text-gray-400 outline-0"
              >
                Base Stats
              </Tab>
            </TabList>

            <TabPanel className="mt-4">
              <div className="mb-4 flex gap-8 text-sm">
                <div className="w-14 text-gray-400">Height</div>
                <div>{detail.height / 10} m</div>
              </div>
              <div className="mb-4 flex gap-8 text-sm">
                <div className="w-14 text-gray-400">Weight</div>
                <div>{detail.weight / 10} kg</div>
              </div>
              <div className="mb-4 flex gap-8 text-sm">
                <div className="w-14 text-gray-400">Abilities</div>
                <div>
                  {detail.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}
                </div>
              </div>
            </TabPanel>
            <TabPanel className="mt-4">
              {detail.stats.map((stat) => (
                <div className="mb-4 ">
                  <div className="mb-2 flex justify-between text-sm">
                    <div className="capitalize text-gray-400">
                      {stat.stat.name}
                    </div>
                    <div>{stat.base_stat}</div>
                  </div>
                  <div className="h-2 w-full rounded bg-gray-300">
                    <div
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      className="h-full rounded bg-blue-500"
                    />
                  </div>
                </div>
              ))}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
