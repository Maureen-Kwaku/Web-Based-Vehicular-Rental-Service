const { gql } = require('apollo-server-express');

module.exports = gql`
  type Car {
    _id: ID!
    featured: Boolean!
    make: String!
    model: String!
    chassis: String
    vin: String
    price: Float!
    description: String
    plateNumber: String!
    images: [String]
    status: CarStatus!
    createdBy: Admin
    createdAt: Date!
    updatedAt: Date!
  }

  enum CarStatus {
    Rented
    Available
  }

  input GetCarFilter {
    carId: ID!
  }

  input DeleteCarInput {
    carId: ID!
  }

  input CreateCarInput {
    featured: Boolean!
    make: String!
    model: String!
    chassis: String
    price: Float!
    vin: String
    description: String
    plateNumber: String!
    images: [String]
  }

  input UpdateCarInput {
    carId: ID!
    featured: Boolean
    make: String
    model: String
    chassis: String
    vin: String
    price: Float
    description: String
    plateNumber: String
    images: [String]
    status: CarStatus
  }

  input GetCarsFilter {
    status: CarStatus
    featured: Boolean
    dateRange: DateRangeInput
    search: String
    orderBy: String
    order: DocumentOrder
  }

  extend type Query {
    car(filter: GetCarFilter!): Car!
    cars(filter: GetCarsFilter = {}, pagination: Pagination): [Car]!
    carsLength(filter: GetCarsFilter = {}): Int!
  }

  extend type Mutation {
    createCar(input: CreateCarInput!): Car!
    updateCar(input: UpdateCarInput!): Car!
    deleteCar(input: DeleteCarInput!): Boolean!
  }
`;
