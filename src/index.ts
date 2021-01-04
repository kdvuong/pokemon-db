import Nano from "nano";
import { getPokemons } from "./models/Pokemon";
import { getMovesets } from "./models/Moveset";
import { getAbilities } from "./models/Ability";
import { getTypes } from "./models/Type";
import { exit } from "process";
import { getMoves } from "./models/Move";
import dotenv from "dotenv";
import { getEvolutions } from "./models/Evolution";
import { Document, IdObject } from "./types";

dotenv.config();

const nano = Nano(
  `http://${process.env.local_couch_user}:${process.env.local_couch_password}@localhost:5984`
);

const toDocument = <T extends IdObject>(obj: T): Document => {
  return { ...obj, _id: obj.id.toString() };
};

const connect = async (dbName: string) => {
  try {
    await nano.db.destroy(dbName);
    console.log(`(${dbName}) destroyed`);
    await nano.db.create(dbName);
    console.log(`(${dbName}) created`);
  } catch (err) {
    console.log(err.message);
    await nano.db.create(dbName);
    console.log(`(${dbName}) created`);
  }

  return nano.use(dbName);
};

async function buildDb<T extends IdObject>(dbName: string, getData: () => Promise<T[]>) {
  const db = await connect(dbName);

  try {
    console.log(`Fetching data for (${dbName})...`);
    const data = await getData();
    const docs = data.map(toDocument);
    console.log(`Done fetching. Putting data to local (${dbName})`);
    await db.bulk({
      docs,
    });
    console.log("Done inserting");
  } catch (err) {
    console.log(err.message);
    console.error(err.stack);
  }
}

function buildMovesets() {
  buildDb("movesets", getMovesets);
}

function buildPokemons() {
  buildDb("pokemons", getPokemons);
}

function buildAbilities() {
  buildDb("abilities", getAbilities);
}

function buildTypes() {
  buildDb("types", getTypes);
}

function buildMoves() {
  buildDb("moves", getMoves);
}

function buildEvolutions() {
  buildDb("evolutions", getEvolutions);
}

const getFunctions = {
  pokemons: getPokemons,
  movesets: getMovesets,
  moves: getMoves,
  types: getTypes,
  abilities: getAbilities,
  evolutions: getEvolutions,
};

async function main() {
  let dbNames = process.argv.slice(2);

  if (dbNames.length === 0) {
    dbNames = ["pokemons", "movesets", "moves", "types", "abilities", "evolutions"];
  }

  for (const dbName of dbNames) {
    await buildDb(dbName, getFunctions[dbName]);
  }

  exit();
}

main();
