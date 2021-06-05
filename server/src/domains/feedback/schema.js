const { gql } = require('apollo-server-express');

module.exports = gql`
  type FeedBack {
    _id: String!
    name: String!
    email: String
    message: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateFeedbackInput {
    name: String!
    email: String
    message: String!
  }

  input GetFeedBacksFilter {
    dateRange: DateRangeInput
    search: String
    orderBy: String
    order: DocumentOrder
  }

  extend type Query {
    feedBacks(filter: GetFeedBacksFilter = {}, pagination: Pagination): [FeedBack]!
  }

  extend type Mutation {
    createFeedBack(input: CreateFeedbackInput!): FeedBack!
  }
`;
