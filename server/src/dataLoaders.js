// @flow

import DataLoader from 'dataloader';

async function batchUsers(Users: Object, keys: Array<*>) {
  try {
    return await Users.find({_id: {$in: keys}}).toArray();
  } catch (error) {
    throw new Error(error);
  }
}

function buildDataLoader({Users}: Object) {
  return {
    userLoader: new DataLoader((keys) => batchUsers(Users, keys), {
      cacheKeyFn: (key) => key.toString(),
    }),
  };
}

export default buildDataLoader;
