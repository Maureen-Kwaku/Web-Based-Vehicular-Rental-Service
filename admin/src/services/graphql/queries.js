import { gql } from "@apollo/client";

export const GET_STATISTICS = gql`
  {
    statistics {
      users
      administrators
      cars
      availableCars
      rentedOutCars
      rentals
      requestedRentals
      paidRentals
      acceptedRentals
      pickedUpRentals
      droppedOffRentals
      cancelledRentals
    }
  }
`;

export const GET_ADMINS = gql`
  query Admins($filter: GetAdminsFilter, $skip: Int, $limit: Int) {
    admins(filter: $filter, pagination: { skip: $skip, limit: $limit }) {
      _id
      name
      email
      phone
      createdAt
      updatedAt
    }
    adminsLength(filter: $filter)
  }
`;

export const GET_USERS = gql`
  query Users($filter: GetUsersFilter, $skip: Int, $limit: Int) {
    users(filter: $filter, pagination: { skip: $skip, limit: $limit }) {
      _id
      name
      email
      address
      photo
      phone
      createdAt
      updatedAt
    }
    usersLength(filter: $filter)
  }
`;

export const GET_CARS = gql`
  query Cars($filter: GetCarsFilter, $skip: Int, $limit: Int) {
    cars(filter: $filter, pagination: { skip: $skip, limit: $limit }) {
      _id
      featured
      make
      model
      price
      chassis
      vin
      description
      plateNumber
      images
      status
      updatedAt
      createdAt
    }
    carsLength(filter: $filter)
  }
`;

export const GET_RENTALS = gql`
  query Rentals($filter: GetRentalsFilter, $skip: Int, $limit: Int) {
    rentals(filter: $filter, pagination: { skip: $skip, limit: $limit }) {
      _id
      car {
        _id
        make
        model
        plateNumber
      }
      accepted {
        at
      }
      createdBy {
        _id
        name
        email
        photo
      }
      pickup {
        address
        at
      }
      dropoff {
        address
        at
      }
      status
      payment {
        _id
        code
        status
      }
      cancellation {
        reason
        at
      }
      amount
      paidAt
      pickedUpAt
      droppedOffAt
      createdAt
      updatedAt
    }
    rentalsLength(filter: $filter)
  }
`;
