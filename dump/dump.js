"use strict";

const PouchDB = require("pouchdb");
const replicationStream = require("pouchdb-replication-stream");
PouchDB.plugin(replicationStream.plugin);
PouchDB.adapter("writableStream", replicationStream.adapters.writableStream);

const NodeCouchDb = require("node-couchdb");
const fs = require("fs");
const auth = {
  user: "khangvuong",
  password: "Khang1999",
};
const couch = new NodeCouchDb({
  auth,
});

const defaultDbs = ["_global_changes", "_replicator", "_users"];

async function dump(dbName) {
  const db = new PouchDB(`http://${auth.user}:${auth.password}@localhost:5984/${dbName}`);
  const ws = fs.createWriteStream(`./dump/dump/${dbName}.txt`);
  db.dump(ws).then((res) => console.log(res));
}

async function main() {
  let dbs = await couch.listDatabases();
  dbs = dbs.filter((db) => !defaultDbs.includes(db));
  console.log(dbs);
  let dbNames = process.argv.slice(2);
  if (dbNames.length === 0) {
    dbNames = ["pokemons", "movesets", "moves", "types", "abilities", "evolutions"];
  }
  for (let i = 0; i < dbNames.length; i++) {
    if (dbs.includes(dbNames[i])) {
      dump(dbNames[i]);
    } else {
      console.log(`${dbNames[i]} is not in local couchdb`);
    }
  }
}

main();
