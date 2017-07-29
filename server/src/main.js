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

  let authOptions = async(req, res: Response) => {
    let user = await authentication(req, mongo.Users);
    return {
      context: {mongo, user},
      schema,
    };
  };
  app.use('/graphql', bodyParser.json(), graphqlExpress(authOptions));

  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
    })
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/graphiql`);
  });
}

startServer();
