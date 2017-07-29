// @flow

import {MongoClient} from 'mongodb';

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/hackernews';

async function connector() {
  let db = await MongoClient.connect(MONGO_URL);
  return {
    Links: db.collection('links'),
    Users: db.collection('users'),
  };
}

export default connector;
