import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_LISTING = gql`
  mutation addListing(
    $address: String!
    $type: String!
    $accessType: String!
    $height: Float!
    $width: Float!
    $depth: Float!
    $description: String!
    $rate: Float!
    $climateControl: Boolean!
  ) {
    addListing(
      address: $address
      type: $type
      accessType: $accessType
      height: $height
      width: $width
      depth: $depth
      description: $description
      rate: $rate
      climateControl: $climateControl
    ) {
      _id
      address
      type
      accessType
      height
      width
      depth
      description
      rate
      username
      climateControl
    }
  }
`;
export const EDIT_LISTING = gql`
  mutation editListing(
    $address: String
    $type: String
    $accessType: String
    $height: Float
    $width: Float
    $depth: Float
    $description: String
    $rate: Float
    $climateControl: Boolean
  ) {
    editListing(
      address: $address
      type: $type
      accessType: $accessType
      height: $height
      width: $width
      depth: $depth
      description: $description
      rate: $rate
      climateControl: $climateControl
    ) {
      _id
      address
      type
      accessType
      height
      width
      depth
      description
      rate
      username
      climateControl
    }
  }
`;
