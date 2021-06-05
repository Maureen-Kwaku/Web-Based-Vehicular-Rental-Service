import { gql } from "@apollo/client";

export const GET_CARS = gql`
  query Cars($filter: GetCarsFilter, $skip: Int, $limit: Int) {
    cars(filter: $filter, pagination: { skip: $skip, limit: $limit }) {
      _id
      featured
      make
      model
      chassis
      vin
      description
      price
      plateNumber
      images
      status
      updatedAt
      createdAt
    }
    carsLength(filter: $filter)
  }
`;

export const GET_CAR = gql`
  query Car($id: ID!) {
    car(filter: { carId: $id }) {
      _id
      featured
      make
      price
      model
      chassis
      vin
      description
      plateNumber
      images
      status
      updatedAt
      createdAt
    }
  }
`;

export const GET_FEEDBACKS = gql`
  query GetFeedBacks($filter: GetFeedBacksFilter, $skip: Int, $limit: Int) {
    feedBacks(filter: $filter, pagination: { skip: $skip, limit: $limit }) {
      _id
      name
      email
      message
      createdAt
      updatedAt
    }
  }
`;
