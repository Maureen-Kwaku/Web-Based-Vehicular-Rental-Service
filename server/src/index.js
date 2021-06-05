const express = require('express');
const cors = require('cors');
const database = require('./infrastructure/database');

// Loading env vars....
require('dotenv').config();

const { GraphqlServer } = require('./server');

const app = express();

app.use(cors());
require('./interfaces/rest').startRest(app);

(async function () {
  await database.connectToMongoDB({
    databaseURI: process.env.MONGO_DATABASE_URI || 'mongodb://localhost:27017/test',
  });
  const graphqlServer = GraphqlServer();
  graphqlServer.applyMiddleware({ app, path: '/graphql' });
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT || 5000}`);
    console.log(`GraphQL API served on http://localhost:${process.env.PORT || 5000}/graphql`);
  });
})();
