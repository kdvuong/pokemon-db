import { MachineData, MoveData, ResultListObject } from "../types/pokeapi";
import { batchGet, pokedex } from "../pokedex";
import { toEnglishEffect, urlToId } from "../utils";
import { Move } from "../types";

const toTm = (data: MachineData[]): number | null => {
  if (data.length === 0) {
    return null;
  }

  const validVersions = [
    "sword-shield",
    "lets-go",
    "ultra-sun-ultra-moon",
    "sun-moon",
    "omega-ruby-alpha-sapphire",
  ];
  for (const version of validVersions) {
    const tm = data.find((d) => d.version_group.name === version);
    if (tm) {
      return urlToId(tm.machine.url, "machine");
    }
  }

  return null;
};

const toMove = (data: MoveData): Move => {
  console.log(data.name);
  return {
    id: data.id,
    name: data.name,
    contest_type: data.contest_type?.name ?? null,
    damage_class: data.damage_class?.name ?? null,
    accuracy: data.accuracy,
    effect: toEnglishEffect(data.effect_entries)?.effect ?? null,
    generation: data.generation.name,
    power: data.power,
    pp: data.pp,
    priority: data.priority,
    type: data.type.name,
    tm: toTm(data.machines),
  };
};

export const getMoves = async (): Promise<Move[]> => {
  const resultsObj: ResultListObject = await pokedex.getMovesList();
  const moves = await batchGet(resultsObj.results, 50, toMove);
  return moves;
};
