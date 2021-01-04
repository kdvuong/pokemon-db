import { evolutionChainMap } from "../evolutionChainFix";
import { pokedex, batchGet } from "../pokedex";
import { Chain, EvolutionChain, EvolutionDetail } from "../types";
import {
  ChainData,
  EvolutionChainData,
  EvolutionDetailData,
  ResultListObject,
} from "../types/pokeapi";

const toEvolutionDetail = (data: EvolutionDetailData): EvolutionDetail => {
  const detail = {} as EvolutionDetail;
  Object.keys(data).forEach((key) => {
    if (data[key] === null) {
      detail[key] = null;
    } else if (data[key].name) {
      detail[key] = data[key].name;
    } else {
      detail[key] = data[key];
    }
  });
  return detail;
};

const toChain = (data: ChainData): Chain => {
  return {
    pokemon: data.species.name,
    is_baby: data.is_baby,
    evolution_details: data.evolution_details.map(toEvolutionDetail),
    evolves_to: data.evolves_to.map(toChain),
  };
};

const toEvolutionChain = (data: EvolutionChainData): EvolutionChain => {
  if (evolutionChainMap.has(data.id)) {
    return evolutionChainMap.get(data.id);
  }

  return {
    id: data.id,
    baby_trigger_item: data.baby_trigger_item?.name ?? null,
    chain: [toChain(data.chain)],
  };
};

export const getEvolutions = async () => {
  const resultsList: ResultListObject = await pokedex.getEvolutionChainsList();
  const evolutions = await batchGet(resultsList.results, 20, toEvolutionChain);
  return evolutions;
};
