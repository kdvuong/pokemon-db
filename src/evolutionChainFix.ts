import corsola from "../fix/evolutions/corsola.json";
import cubone from "../fix/evolutions/cubone.json";
import darumaka from "../fix/evolutions/darumaka.json";
import diglett from "../fix/evolutions/diglett.json";
import exeggcute from "../fix/evolutions/exeggcute.json";
import farfetchd from "../fix/evolutions/farfetchd.json";
import geodude from "../fix/evolutions/geodude.json";
import grimer from "../fix/evolutions/grimer.json";
import koffing from "../fix/evolutions/koffing.json";
import meowth from "../fix/evolutions/meowth.json";
import mimejr from "../fix/evolutions/mime-jr.json";
import pichu from "../fix/evolutions/pichu.json";
import ponyta from "../fix/evolutions/ponyta.json";
import rattata from "../fix/evolutions/rattata.json";
import sandshrew from "../fix/evolutions/sandshrew.json";
import yamask from "../fix/evolutions/yamask.json";
import zigzagoon from "../fix/evolutions/zigzagoon.json";
import { EvolutionChain } from "./types";

const build = (evoChains: EvolutionChain[]) => {
  const map: Map<number, EvolutionChain> = new Map();
  evoChains.forEach((chain) => {
    map.set(chain.id, chain);
  });
  return map;
};

const evoChains = [
  corsola,
  cubone,
  darumaka,
  diglett,
  exeggcute,
  farfetchd,
  geodude,
  grimer,
  koffing,
  meowth,
  mimejr,
  pichu,
  ponyta,
  rattata,
  sandshrew,
  yamask,
  zigzagoon,
];

export const evolutionChainMap: Map<number, EvolutionChain> = build(evoChains);
