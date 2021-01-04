import { batchGet, pokedex } from "../pokedex";
import { Type } from "../types";
import { NameObject, ResultListObject, TypeData } from "../types/pokeapi";
import { toRelatedPokemon, urlToId } from "../utils";

const flattenName = (obj: NameObject) => {
  return obj.name;
};

const toType = (data: TypeData): Type => {
  const { damage_relations } = data;
  return {
    id: data.id,
    name: data.name,
    damage_relations: {
      double_damage_from: damage_relations.double_damage_from.map(flattenName),
      double_damage_to: damage_relations.double_damage_to.map(flattenName),
      half_damage_from: damage_relations.half_damage_from.map(flattenName),
      half_damage_to: damage_relations.half_damage_to.map(flattenName),
      no_damage_from: damage_relations.no_damage_from.map(flattenName),
      no_damage_to: damage_relations.no_damage_to.map(flattenName),
    },
    pokemons: data.pokemon.map(toRelatedPokemon),
    moves: data.moves.map((m) => urlToId(m.url, "move")),
  };
};

export const getTypes = async (): Promise<Type[]> => {
  const resultsObj: ResultListObject = await pokedex.getTypesList();
  const types = await batchGet(resultsObj.results, resultsObj.results.length, toType);
  return types;
};
