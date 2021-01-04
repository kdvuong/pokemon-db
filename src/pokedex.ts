import Pokedex from "pokedex-promise-v2";
import { UrlObject } from "./types/pokeapi";

const options = {
  protocol: "http",
  hostName: "localhost:8000",
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000, // 100s
  timeout: 1000 * 1000, // 5s
};

export const baseUrl = `${options.protocol}://${options.hostName}${options.versionPath}`;

export const pokedex = new Pokedex(options);

// D is data type from poke api
// T is the type we want
export const batchGet = async <D, T>(
  results: UrlObject[],
  batchSize: number,
  mapFunction: (data: D) => T = (d) => (d as unknown) as T
) => {
  let converted: T[] = [];
  let responses: Promise<D>[] = [];

  for (let i = 0; i < results.length; i++) {
    responses.push(pokedex.resource(results[i].url));
    if (i % batchSize === 0) {
      const data = await Promise.all(responses);
      converted = [...converted, ...data.map(mapFunction)];
      responses = [];
    }
  }

  // clean up responses that were not handled in the loop
  if (responses.length > 0) {
    const data = await Promise.all(responses);
    converted = [...converted, ...data.map(mapFunction)];
  }

  return converted;
};
