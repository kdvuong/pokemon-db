import { baseUrl } from "./pokedex";
import { RelatedPokemon } from "./types";
import { EffectEntry, RelatedPokemonData } from "./types/pokeapi";

export const toEnglishEffect = (
  entries: EffectEntry[]
): { effect: string; short_effect: string } | null => {
  if (entries.length === 0) {
    return null;
  }

  return entries.find((e) => e.language.name === "en");
};

export const urlToId = (url: string, path: string): number => {
  const toRemove = baseUrl + path;
  return parseInt(url.replace(toRemove, "").replaceAll("/", ""), 10);
};

export const toRelatedPokemon = (data: RelatedPokemonData): RelatedPokemon => {
  return {
    id: urlToId(data.pokemon.url, "pokemon"),
    slot: data.slot,
  };
};
