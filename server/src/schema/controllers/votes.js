// @flow

import {ObjectID} from 'mongodb';
import type {Context} from '../types/Context-type';
type Data = {
  linkId?: string;
};


async function createVote(root: void, data: Data, context: Context) {
  let {mongo, user} = context;
  let userId = user && user._id;
  let linkId = new ObjectID(data.linkId);
  let newVote = {
    userId,
    linkId,
  };
  let response = await mongo.Votes.insert(newVote);
  return {
    id: response.insertedIds[0],
    ...newVote,
  };
}

export {createVote};
