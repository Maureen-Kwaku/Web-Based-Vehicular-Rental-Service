const MongoMemoryServer = require('mongodb-memory-server').default;
const mongoose = require('mongoose');
const { createTestClient } = require('apollo-server-integration-testing');
const { GraphqlServer } = require('../src/server');
const { gql } = require('apollo-server-express');

let mongoServer;

// Default timeout to wait for mongodb memory server to download, just in case..
jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer({
    debug: false,
  });
  const databaseURI = await mongoServer.getUri();
  await mongoose.connect(databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  });
});

afterAll(async () => {
  await mongoServer.stop();
});

const client = GraphqlServer();
const { query, mutate } = createTestClient({
  apolloServer: client,
});

const variables = {
  entityID: "",
};

describe('Integration Tests', () => {
  it('should retrive root', async () => {
      
  })
});