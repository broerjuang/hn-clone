// @flow

import {makeExecutableSchema} from 'graphql-tools';

let typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }
`;

export default makeExecutableSchema({typeDefs});
