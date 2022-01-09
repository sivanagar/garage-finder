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
    $title: String!
    $address: String!
    $type: String!
    $accessType: String!
    $height: Float!
    $width: Float!
    $depth: Float!
    $description: String!
    $rate: Float!
    $climateControl: Boolean!
    $location: locationInput!
  ) {
    addListing(
      title: $title
      address: $address
      type: $type
      accessType: $accessType
      height: $height
      width: $width
      depth: $depth
      description: $description
      rate: $rate
      climateControl: $climateControl
      location: $location
    ) {
      _id
      title
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
      location {
        type
        coordinates
      }
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

export const CONTACT_HOST = gql`
  mutation contactHost(
    $hostUsername: String!
    $listingId: ID!
    $message: String!
  ) {
    contactHost(
      hostUsername: $hostUsername
      listingId: $listingId
      message: $message
    )
  }
`;
