const { gql } = require('apollo-server-express');

module.exports = gql`
  type Rental {
    _id: ID!
    car: Car!
    createdBy: User!
    accepted: AcceptedType
    pickup: WhenType
    dropoff: WhenType
    status: RentalStatus!
    payment: Payment
    cancellation: CancellationType
    amount: Float!
    paidAt: Date
    pickedUpAt: Date
    droppedOffAt: Date
    createdAt: Date!
    updatedAt: Date!
  }

  type AcceptedType {
    by: Admin
    at: Date
  }

  type WhenType {
    address: String
    at: Date
  }

  enum RentalStatus {
    Requested
    Paid
    Accepted
    PickedUp
    DroppedOff
    Cancelled
  }

  type CancellationType {
    reason: String
    at: Date
  }

  input GetRentalFilter {
    rentalId: ID!
  }

  input GetRentalsFilter {
    status: RentalStatus
    createdBy: ID
    dateRange: DateRangeInput
    search: String
    orderBy: String
    order: DocumentOrder
  }

  input CreateRentalInput {
    car: ID!
    pickupTime: Date!
    pickupAddress: String!
    dropoffAddress: String!
    dropoffTime: Date!
  }

  input CancelRentalInput {
    rentalId: ID!
    reason: String!
  }

  input ApproveRentalInput {
    rentalId: ID!
  }

  input PickupRentalInput {
    rentalId: ID!
  }

  input FinishRentalProcessInput {
    rentalId: ID!
  }

  input UpdateRentalInput {
    rentalId: ID!
  }

  input DeleteRentalInput {
    rentalId: ID!
  }

  extend type Query {
    rental(filter: GetRentalFilter!): Rental!
    rentals(filter: GetRentalsFilter = {}, pagination: Pagination): [Rental]
    rentalsLength(filter: GetRentalsFilter = {}): Int
  }

  extend type Mutation {
    createRental(input: CreateRentalInput!): Payment!
    cancelRental(input: CancelRentalInput!): Boolean!
    approveRental(input: ApproveRentalInput!): Boolean!
    pickupRental(input: PickupRentalInput!): Boolean!
    finishRentalProcess(input: FinishRentalProcessInput!): Boolean!
  }
`;
