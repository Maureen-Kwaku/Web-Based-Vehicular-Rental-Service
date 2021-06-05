require('dotenv').config();
require('graphql-iso-date');
const { ApolloServer, gql } = require('apollo-server-express');
const graphqlInterface = require('./interfaces/graphql');
const domains = require('./domains');
const { resolveUser } = require('./middlewares');

const rootTypeDef = gql`
  scalar Date
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
  input DateRangeInput {
    startDate: Date!
    endDate: Date!
  }
  enum DocumentOrder {
    ascending
    descending
  }
  enum DocumentFormat {
    pdf
    csv
    xlsx
  }
  input Pagination {
    skip: Int
    limit: Int
  }
`;

// Configuring graphQL server
exports.GraphqlServer = () => {
  return new ApolloServer({
    typeDefs: [rootTypeDef, ...graphqlInterface.typeDefs],
    resolvers: [graphqlInterface.resolvers],
    introspection: true,
    playground: true,
    tracing: true,
    context: async ({ req }) => {
      let user = null;
      if (req.headers.authorization)
        user = await resolveUser({
          token: req.headers.authorization,
        });
      return {
        user,
        domains,
      };
    },
  });
};
