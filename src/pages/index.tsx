import type { NextPage } from "next";
import { useEffect, useState } from "react";
import type React from "react";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";
import { inferQueryResponse } from "./api/trpc/[trpc]";

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

  const voteForRoundest = (selected: number) => {
    setPokemon(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <PokemonView
                pokemon={firstPokemon.data}
                vote={() => voteForRoundest(firstPokemon)}
              />
              <div className="p-8">Vs</div>
              <PokemonView
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(secondPokemon)}
              />
            </>
          )}
      </div>
    </div>
  );
};

export default Home;

type PokemonFromServer = inferQueryResponse<"pokemon.get-pokemon-by-id">;

const PokemonView: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <img src={props.pokemon.sprites.front_default} className="w-64 h-64" />
      <div className="text-xl text-center capitalize mt-[-2rem]">
        {props.pokemon.name}
      </div>
      <button className={btn} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};
