export interface NameObject {
  name: string;
}

export interface UrlObject {
  url: string;
}

export interface ResultObject extends NameObject, UrlObject {}

export interface ResultListObject {
  results: ResultObject[];
}

export interface Variety {
  is_default: boolean;
  pokemon: NameObject;
}

export interface AbilityData {
  ability: UrlObject;
  is_hidden: boolean;
}

export interface StatData {
  base_stat: number;
  effort: number;
  stat: NameObject;
}

export interface TypeData {
  slot: number;
  type: NameObject;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NameObject;
  version_group: NameObject;
}

export interface PokemonMoveData {
  move: ResultObject;
  version_group_details: VersionGroupDetail[];
}

export interface Genus {
  genus: string;
  language: NameObject;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NameObject;
  version: NameObject;
}

export interface SpecieData {
  id: number;
  name: string;
  varieties: Variety[];
  generation: NameObject;
  growth_rate: NameObject;
  gender_rate: number;
  capture_rate: number;
  genera: Genus[];
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: UrlObject;
}

export interface PokemonData {
  abilities: AbilityData[];
  height: number;
  weight: number;
  id: number;
  name: string;
  stats: StatData[];
  types: TypeData[];
  moves: PokemonMoveData[];
  is_default: boolean;
  species: NameObject;
}

export interface EffectEntry {
  effect: string;
  language: NameObject;
  short_effect: string;
}

export interface RelatedPokemonData {
  pokemon: ResultObject;
  slot: number;
}

export interface MachineData {
  machine: UrlObject;
  version_group: NameObject;
}

export interface MoveData {
  id: number;
  name: string;
  contest_type: NameObject;
  damage_class: NameObject;
  accuracy: number;
  effect_entries: EffectEntry[];
  generation: NameObject;
  power: number;
  pp: number;
  priority: number;
  type: NameObject;
  target: NameObject;
  machines: MachineData[];
}

export interface DamageRelationsData {
  double_damage_from: NameObject[];
  double_damage_to: NameObject[];
  half_damage_from: NameObject[];
  half_damage_to: NameObject[];
  no_damage_from: NameObject[];
  no_damage_to: NameObject[];
}

export interface TypeData {
  id: number;
  name: string;
  damage_relations: DamageRelationsData;
  pokemon: RelatedPokemonData[];
  moves: ResultObject[];
}

export interface EvolutionDetailData {
  item: NameObject | null;
  trigger: NameObject | null;
  gender: NameObject | null;
  known_move: NameObject | null;
  known_move_type: NameObject | null;
  location: NameObject | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: NameObject | null;
  party_type: NameObject | null;
  relative_physical_stats: 0 | 1 | -1;
  time_of_day: string;
  trade_species: NameObject;
  turn_upside_down: boolean;
}

export interface ChainData {
  is_baby: boolean;
  species: NameObject;
  evolution_details: EvolutionDetailData[];
  evolves_to: ChainData[];
}

export interface EvolutionChainData {
  id: number;
  chain: ChainData;
  baby_trigger_item: NameObject | null;
}

export interface AbilityData {
  id: number;
  name: string;
  generation: NameObject;
  effect_entries: EffectEntry[];
  pokemon: RelatedPokemonData[];
}
