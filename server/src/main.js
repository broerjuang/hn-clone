// @flow

import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';

import schema from './schema/schema.js';

const PORT = process.env.PORT || 3000;

function startServer() {
  let app = express();

  app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

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
