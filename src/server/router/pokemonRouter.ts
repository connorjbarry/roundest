import * as trpc from "@trpc/server";
import { z } from "zod";

import { PokemonClient } from "pokenode-ts";

export const pokemonRouter = trpc.router().query("get-pokemon-by-id", {
  input: z.object({ id: z.number() }),
  async resolve({ input }) {
    const api = new PokemonClient();

    const pokemon = await api.getPokemonById(input.id);
    return { name: pokemon.name, sprites: pokemon.sprites };
  },
});
