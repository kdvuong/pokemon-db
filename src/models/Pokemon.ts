import {
  AbilityData,
  FlavorTextEntry,
  Genus,
  PokemonData,
  SpecieData,
  ResultListObject,
  StatData,
  TypeData,
  Variety,
} from "../types/pokeapi";
import { batchGet, pokedex } from "../pokedex";
import { urlToId } from "../utils";
import { Pokemon, PokemonAbility, PokemonStats, PokemonType, PokemonVariety, Stat } from "../types";

const toPokemonAbility = (ability: AbilityData): PokemonAbility => {
  return { is_hidden: ability.is_hidden, id: urlToId(ability.ability.url, "ability") };
};

const toStat = (data: StatData): Stat | null => {
  if (data) {
    const { base_stat, effort } = data;
    return {
      value: base_stat,
      effort,
    };
  }
  return null;
};

const toPokemonStats = (stats: StatData[]): PokemonStats => {
  const hp = stats.find((s) => s.stat.name === "hp");
  const attack = stats.find((s) => s.stat.name === "attack");
  const defense = stats.find((s) => s.stat.name === "defense");
  const s_attack = stats.find((s) => s.stat.name === "special-attack");
  const s_defense = stats.find((s) => s.stat.name === "special-defense");
  const speed = stats.find((s) => s.stat.name === "speed");
  return {
    hp: toStat(hp),
    attack: toStat(attack),
    defense: toStat(defense),
    special_attack: toStat(s_attack),
    special_defense: toStat(s_defense),
    speed: toStat(speed),
  };
};

const toPokemonType = (type: TypeData): PokemonType => {
  return { slot: type.slot, name: type.type.name };
};

const toPokemonVariety = (variety: Variety): PokemonVariety => {
  return { is_default: variety.is_default, name: variety.pokemon.name };
};

const toEnglishCategory = (genera: Genus[]): string => {
  const genus = genera.find((g) => g.language.name === "en");
  return genus.genus;
};

const toEnglishDescription = (entries: FlavorTextEntry[]): string | null => {
  const validVersions = ["sword", "ultra-sun", "lets-go-pikachu", "omega-ruby"];
  for (const version of validVersions) {
    const entry = entries.find((e) => e.language.name === "en" && e.version.name === version);
    if (entry) {
      return entry.flavor_text;
    }
  }
  console.log("no flavor text");
  return null;
};

const toPokemon = (specieData: SpecieData, pokemonData: PokemonData): Pokemon => {
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    height: pokemonData.height,
    weight: pokemonData.weight,
    abilities: pokemonData.abilities.map(toPokemonAbility),
    stats: toPokemonStats(pokemonData.stats),
    types: pokemonData.types.map(toPokemonType),
    moveset_id: pokemonData.id,
    varieties: specieData.varieties.map(toPokemonVariety),
    generation: specieData.generation.name,
    gender_rate: specieData.gender_rate,
    capture_rate: specieData.capture_rate,
    growth_rate: specieData.growth_rate.name,
    evolution_chain_id: urlToId(specieData.evolution_chain.url, "evolution-chain"),
    description: toEnglishDescription(specieData.flavor_text_entries),
    category: toEnglishCategory(specieData.genera),
    is_default: pokemonData.is_default,
  };
};

const buildMap = (data: SpecieData[]) => {
  const map: Map<string, SpecieData> = new Map();
  data.forEach((d) => {
    map.set(d.name, d);
  });
  return map;
};

export const getPokemons = async (): Promise<Pokemon[]> => {
  const specieListResult: ResultListObject = await pokedex.getPokemonSpeciesList();
  const pokemonListResult: ResultListObject = await pokedex.getPokemonsList();
  const species: SpecieData[] = await batchGet<SpecieData, SpecieData>(
    specieListResult.results,
    30
  );
  const pokemonSpecieMap = buildMap(species);
  const pokemons: Pokemon[] = await batchGet<PokemonData, Pokemon>(
    pokemonListResult.results,
    30,
    (data: PokemonData) => {
      const specieData = pokemonSpecieMap.get(data.species.name);
      return toPokemon(specieData, data);
    }
  );

  return pokemons;
};
