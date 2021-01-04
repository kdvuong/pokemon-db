import dotenv from "dotenv";
import Nano from "nano";
import Cloudant from "@cloudant/cloudant";

dotenv.config();

const cloud_username = process.env.cloudant_username;
const cloud_password = process.env.cloudant_password;
const local_username = process.env.local_couch_user;
const local_password = process.env.local_couch_password;

const cloudant = Cloudant({
  account: cloud_username,
  password: cloud_password,
});

const localPath = `http://localhost:5984`;
const cloudPath = `https://${cloud_username}.cloudantnosqldb.appdomain.cloud`;
const nano = Nano(`http://${local_username}:${local_password}@localhost:5984`);

async function listDbs() {
  const dbs = await cloudant.db.list();
  console.log(dbs);
}

async function sync() {
  let dbNames = process.argv.slice(2);
  if (dbNames.length === 0) {
    dbNames = ["pokemons", "movesets", "moves", "types", "abilities", "evolutions"];
  }
  const cloudDbs = await cloudant.db.list();
  const localDbs = await nano.db.list();

  for (const dbName of dbNames) {
    if (localDbs.includes(dbName)) {
      console.log(`Local (${dbName}) found.`);
      if (cloudDbs.includes(dbName)) {
        console.log(`Cloud (${dbName}) found. Deleting current cloud db...`);
        await cloudant.db.destroy(dbName);
        await cloudant.db.create(dbName);
      }
      console.log("Syncing local to cloud...");
      await replicate(dbName);
      console.log(`Done syncing (${dbName})`);
    } else {
      console.log(`(${dbName}) doesn't exist locally.`);
    }
  }
}

async function replicate(dbName: string) {
  await nano.request({
    method: "post",
    path: "_replicator",
    body: {
      create_target: true,
      continuous: false,
      source: {
        url: localPath + `/${dbName}`,
        headers: {
          Authorization: `Basic ${base64Token(local_username, local_password)}`,
        },
      },
      target: {
        url: cloudPath + `/${dbName}`,
        headers: {
          Authorization: `Basic ${base64Token(cloud_username, cloud_password)}`,
        },
      },
    },
  });
}

function base64Token(username: string, password: string) {
  const data = `${username}:${password}`;
  const buff = Buffer.from(data);
  return buff.toString("base64");
}

sync();
