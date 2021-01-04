# pokemon-db
CLI tool to build a simple CouchDb for Pokemon. Data source: https://github.com/PokeAPI/pokeapi

## Requirements
- Setup database by following https://github.com/PokeAPI/pokeapi
- Install CouchDb
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