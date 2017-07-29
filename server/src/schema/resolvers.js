// @flow
import {allUsers, createUser, signinUser} from './controllers/users';
import {allLinks, createLink} from './controllers/links';
import {createVote} from './controllers/votes';

import type {Context} from './types/Context-type';

type RootLink = {
  _id: string;
  id?: string;
  postedById: string;
};

type RootVotes = {
  _id: string;
  id?: string;
  userId: string;
  linkId: string;
};

type RootUser = {
  _id: string;
  id: string;
};

let resolvers = {
  Query: {
    allLinks,
    allUsers,
  },
  Mutation: {
    createLink,
    createVote,
    createUser,
    signinUser,
  },
  Link: {
    id: (root: RootLink) => root._id || root.id,
    postedBy: async(root: RootLink, data: Object, context: Context) => {
      let {postedById} = root;
      let {Users} = context.mongo;
      return await Users.findOne({_id: postedById});
    },
    votes: async(root: RootLink, data: Object, context: Context) => {
      let {_id} = root;
      let {Votes} = context.mongo;
      return await Votes.find({linkId: _id}).toArray();
    },
  },
  User: {
    id: (root: RootUser) => root._id || root.id,
    votes: async(root: RootUser, data: Object, context: Context) => {
      let {_id} = root;
      let {Votes} = context.mongo;
      return Votes.find({userId: _id}).toArray();
    },
  },
  Vote: {
    id: (root: RootVotes) => root._id || root.id,
    user: async(root: RootVotes, data: Object, context: Context) => {
      let {userId} = root;
      let {Users} = context.mongo;
      return await Users.findOne({_id: userId});
    },
    link: async(root: RootVotes, data: Object, context: Context) => {
      let {linkId} = root;
      let {Links} = context.mongo;
      return await Links.findOne({_id: linkId});
    },
  },
};

export default resolvers;
