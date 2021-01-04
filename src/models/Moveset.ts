import { PokemonData, ResultListObject } from "../types/pokeapi";
import { pokedex, batchGet } from "../pokedex";
import { urlToId } from "../utils";
import { Moveset, MoveSummary } from "../types";

const toMoveset = (data: PokemonData): Moveset => {
  const egg: MoveSummary[] = [];
  const level_up: MoveSummary[] = [];
  const machine: MoveSummary[] = [];
  const tutor: MoveSummary[] = [];

  data.moves.forEach((move) => {
    move.version_group_details.forEach((detail) => {
      if (
        detail.version_group.name === "sword-shield" ||
        detail.version_group.name === "ultra-sun-ultra-moon"
      ) {
        const m: MoveSummary = { id: urlToId(move.move.url, "move") };
        if (detail.move_learn_method.name === "egg") {
          egg.push(m);
        } else if (detail.move_learn_method.name === "level-up") {
          level_up.push({ ...m, level_learned_at: detail.level_learned_at });
        } else if (detail.move_learn_method.name === "machine") {
          machine.push(m);
        } else if (detail.move_learn_method.name === "tutor") {
          tutor.push(m);
        }
      }
    });
  });
  return {
    id: data.id,
    egg,
    level_up,
    machine,
    tutor,
  };
};

export const getMovesets = async (): Promise<Moveset[]> => {
  const resultsObj: ResultListObject = await pokedex.getPokemonsList();
  const movesets = await batchGet<PokemonData, Moveset>(resultsObj.results, 20, toMoveset);
  return movesets;
};
