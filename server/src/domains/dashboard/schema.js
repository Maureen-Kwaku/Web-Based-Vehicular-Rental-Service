const { gql } = require('apollo-server-express');

module.exports = gql`
  type DashboardStatistics {
    users: Int!
    administrators: Int!
    cars: Int!
    availableCars: Int!
    rentedOutCars: Int!
    rentals: Int!
    requestedRentals: Int!
    paidRentals: Int!
    acceptedRentals: Int!
    pickedUpRentals: Int!
    droppedOffRentals: Int!
    cancelledRentals: Int!
  }

  extend type Query {
    statistics: DashboardStatistics!
  }
`;
