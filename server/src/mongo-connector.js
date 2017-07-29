// @flow

import {Logger, MongoClient} from 'mongodb';

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/hackernews';

async function connector() {
  let db = await MongoClient.connect(MONGO_URL);
  let logCount = 0;
  Logger.setCurrentLogger((msg) => {
    console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`);
  });
  Logger.setLevel(`debug`);
  Logger.filter(`class`, ['Cursor']);
  return {
    Links: db.collection('links'),
    Users: db.collection('users'),
    Votes: db.collection('vites'),
  };
}

export default connector;
