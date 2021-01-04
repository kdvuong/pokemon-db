import { pokedex, batchGet } from "../pokedex";
import { Ability } from "../types";
import { AbilityData, ResultListObject } from "../types/pokeapi";
import { toEnglishEffect, toRelatedPokemon } from "../utils";

const toAbility = (data: AbilityData): Ability => {
  return {
    id: data.id,
    name: data.name,
    generation: data.generation.name,
    effect: toEnglishEffect(data.effect_entries)?.effect ?? null,
    short_effect: toEnglishEffect(data.effect_entries)?.short_effect ?? null,
    pokemons: data.pokemon.map(toRelatedPokemon),
  };
};

export const getAbilities = async () => {
  const resultsObj: ResultListObject = await pokedex.getAbilitiesList();
  const abilities = await batchGet<AbilityData, Ability>(resultsObj.results, 20, toAbility);
  return abilities;
};
