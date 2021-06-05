const { gql } = require('apollo-server-express');

module.exports = gql`
  type Payment {
    _id: ID!
    code: String!
    rental: Rental!
    amount: Float!
    authorizationUrl: String
    accessCode: String
    status: PaymentStatus!
    createdBy: User
    createdAt: Date!
    updatedAt: Date!
  }

  enum PaymentStatus {
    Pending
    Successful
    Failed
  }
`;
