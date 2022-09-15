import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";

const btn =
  "items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-noen focus;ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState<number[]>([]);

  useEffect(() => {
    setPokemon(getOptionsForVote());
  }, []);

  const [first, second] = pokemon;

  const firstPokemon = trpc.useQuery([
    "pokemon.get-pokemon-by-id",
    { id: first! },
  ]);
  const secondPokemon = trpc.useQuery([
    "pokemon.get-pokemon-by-id",
    { id: second! },
  ]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForRoundest = (selected: number) => {
    setPokemon(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-64 h-64 flex flex-col items-center">
          <img
            src={firstPokemon.data?.sprites.front_default}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {firstPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => voteForRoundest(firstPokemon)}>
            Rounder
          </button>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col items-center">
          <img
            src={secondPokemon.data?.sprites.front_default}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {secondPokemon.data?.name}
          </div>
          <button
            className={btn}
            onClick={() => voteForRoundest(secondPokemon)}
          >
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
