const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    address: String!
    photo: String!
    phone: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type UserAuth {
    user: User
    token: String
  }

  input CreateUserInput {
    name: String!
    email: String!
    photo: String!
    address: String!
    phone: String!
    password: String!
  }

  input GetUserFilter {
    userId: ID!
  }

  input DeleteUserInput {
    userId: ID!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input GetUsersFilter {
    name: String
    email: String
    phone: String
    dateRange: DateRangeInput
    search: String
    orderBy: String
    order: DocumentOrder
  }

  input UpdateUserInput {
    _id: ID!
  }

  extend type Query {
    user(filter: GetUserFilter = {}): User!
    users(filter: GetUsersFilter = {}, pagination: Pagination): [User]!
    usersLength(filter: GetUsersFilter = {}): Int!
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): UserAuth!
    updateUser(input: UpdateUserInput!): User!
    deleteUser(input: DeleteUserInput!): Boolean!
    loginUser(input: LoginUserInput!): UserAuth!
  }
`;
