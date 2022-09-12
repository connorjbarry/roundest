import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState<number[]>([]);

  useEffect(() => {
    setPokemon(getOptionsForVote());
  }, []);

  const [first, second] = pokemon;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-16 h-16 bg-red-400">{first}</div>
        <div className="p-8">Vs</div>
        <div className="w-16 h-16 bg-red-400">{second}</div>
      </div>
    </div>
  );
};

export default Home;
