// @flow
import {allUsers, createUser, signinUser} from './controllers/users';
import {allLinks, crateateLink} from './controllers/links';

import type {Context} from './types/Context-type';

type Root = {
  _id: string;
  id?: string;
  postedById: string;
};

let resolvers = {
  Query: {
    allLinks,
    allUsers,
  },
  Mutation: {
    crateateLink,
    createUser,
    signinUser,
  },
  Link: {
    id: (root: Root) => root._id || root.id,
    postedBy: async(root: Root, data: Object, context: Context) => {
      let {postedById} = root;
      let {Users} = context.mongo.Users;
      return await Users.findOne({_id: postedById});
    },
  },
  User: {
    id: (root: any) => root._id || root.id,
  },
};

export default resolvers;
