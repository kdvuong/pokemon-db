export interface IdObject {
  id: number;
}

export interface Document {
  _id: string;
}

// document interface

export interface Pokemon extends IdObject {
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  stats: PokemonStats;
  types: PokemonType[];
  moveset_id: number;
  varieties: PokemonVariety[];
  generation: string;
  gender_rate: number;
  capture_rate: number;
  growth_rate: string;
  evolution_chain_id: number;
  description: string;
  category: string;
  is_default: boolean;
}

export interface Move extends IdObject {
  name: string;
  contest_type: string | null;
  damage_class: string | null;
  accuracy: number | null;
  effect: string | null;
  generation: string;
  power: number | null;
  pp: number | null;
  priority: number;
  type: string;
  tm: number | null;
}

export interface Moveset extends IdObject {
  egg: MoveSummary[];
  level_up: MoveSummary[];
  machine: MoveSummary[];
  tutor: MoveSummary[];
}

export interface Ability extends IdObject {
  name: string;
  generation: string;
  effect: string;
  short_effect: string;
  pokemons: RelatedPokemon[];
}

export interface Type extends IdObject {
  name: string;
  damage_relations: DamageRelations;
  pokemons: RelatedPokemon[];
  moves: number[];
}

export interface EvolutionChain extends IdObject {
  chain: Chain[];
  baby_trigger_item: string | null;
}

// data interface

export interface PokemonAbility {
  id: number;
  is_hidden: boolean;
}

export interface Stat {
  value: number;
  effort: number;
}

export interface PokemonStats {
  hp: Stat;
  attack: Stat;
  defense: Stat;
  special_attack: Stat;
  special_defense: Stat;
  speed: Stat;
}

export interface PokemonType {
  name: string;
  slot: number;
}

export interface PokemonVariety {
  is_default: boolean;
  name: string;
}

export interface RelatedPokemon {
  id: number;
  slot: number;
}

export interface MoveSummary {
  id: number;
  level_learned_at?: number;
}

export interface DamageRelations {
  double_damage_from: string[];
  double_damage_to: string[];
  half_damage_from: string[];
  half_damage_to: string[];
  no_damage_from: string[];
  no_damage_to: string[];
}

export interface Chain {
  is_baby: boolean;
  pokemon: string;
  evolution_details: EvolutionDetail[];
  evolves_to: Chain[];
}

export interface EvolutionDetail {
  item: string | null;
  trigger: string | null;
  gender: string | null;
  known_move: string | null;
  known_move_type: string | null;
  location: string | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: string | null;
  party_type: string | null;
  relative_physical_stats: 0 | 1 | -1;
  time_of_day: string;
  trade_species: string;
  turn_upside_down: boolean;
}
