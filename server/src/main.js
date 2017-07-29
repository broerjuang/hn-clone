// @flow

import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';

import connect from './mongo-connector';
import schema from './schema/schema.js';
import authentication from './authentication';

const PORT = process.env.PORT || 3000;

async function startServer() {
  let mongo = await connect();
  let app = express();

  let buildOptions = async(req) => {
    // A kinda dirty solution because passHeader using applloGraphQl,
    // did not modify the header
    // TODO: next it will use real request from the client and sending the auth
    req.headers.Authorization = 'bearer token-admin@gmail.com';
    let user = await authentication(req, mongo.Users);
    return {
      context: {mongo, user},
      schema,
    };
  };
  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      // passHeader: `'Authorization: 'bearer token-admin@gmail.com'`,
    })
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/graphiql`);
  });
}

startServer();
