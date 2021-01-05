# pokemon-db
CLI tool to build a simple CouchDb for Pokemon. Data source: https://github.com/PokeAPI/pokeapi

## Why CouchDb and not other popular NoSql database or even SQL?
- To store structured data on the frontend, I have to use IndexedDb API. IndexedDb is very low-level so there are multiple libraries that simplify the API. One of them is PouchDb which conveniently fits my need. PouchDb can query from local IndexedDb, furthermore, it has a fallback mechanism where if the document doesn't exist locally, it can fetch the document from a remote database. This leads me toward Cloudant, which services CouchDb and has a free tier.
- Pokemon data are static and readonly, it can simply exist as JSON objects so SQL is not necessary.

## Note
PokeApi evolution chain data does not handle alternate forms very well (missing alolan and incorrect relationship between default form and region specific evolved form).
I patched this by manually creating the correct jsons for pokemons with galar or alolan forms. You can find the jsons in `fix/evolutions/`. This patch can be removed once PokeApi fixes their data.

## Requirements
- Setup database by following https://github.com/PokeAPI/pokeapi
- Install CouchDb and setup local db at http://localhost:5984/_utils/
- Register to Cloudant and create a database (this is the remote database)

## How to run
1. Clone this repo
2. Run `yarn` or `npm install` to install dependencies
3. Create .env file at the top directory and fill out these fields
```
local_couch_user=your_local_couch_username
local_couch_password=your_local_couch_password
cloudant_username=your_remote_couch_username
cloudant_password=your_remote_couch_password
```
4. Run `yarn build` to build everything. [**Note: Pokemons take very long to build, please be patient]
- To build specified database, run `yarn build pokemons moves movesets`.
- Available database names: `pokemons | moves | movesets | types | abilities | evolutions`
5. Run `yarn sync` to sync everything to Cloudant, or separated by space.
6. To dump to .txt file, run `yarn dump` to dump everything, or separated by space.
7. To split .txt to multiple smaller .txt, run `yarn split dbName`.


