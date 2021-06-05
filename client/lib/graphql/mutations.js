import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      user {
        _id
        name
        email
        phone
        address
        photo
        createdAt
        updatedAt
      }
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $phone: String!
    $address: String!
    $photo: String!
    $password: String!
  ) {
    createUser(
      input: {
        name: $name
        email: $email
        phone: $phone
        address: $address
        photo: $photo
        password: $password
      }
    ) {
      user {
        _id
        name
        email
        phone
        address
        photo
        createdAt
        updatedAt
      }
      token
    }
  }
`;

export const CREATE_RENTAL = gql`
  mutation(
    $carId: ID!
    $pickupTime: Date!
    $pickupAddress: String!
    $dropoffAddress: String!
    $dropoffTime: Date!
  ) {
    createRental(
      input: {
        car: $carId
        pickupTime: $pickupTime
        pickupAddress: $pickupAddress
        dropoffTime: $dropoffTime
        dropoffAddress: $dropoffAddress
      }
    ) {
      _id
      authorizationUrl
      amount
    }
  }
`;

export const CREATE_FEEDBACK = gql`
  mutation CreateFeedback($name: String!, $email: String, $message: String!) {
    createFeedBack(input: { name: $name, email: $email, message: $message }) {
      _id
    }
  }
`;
