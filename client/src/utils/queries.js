import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_LISTING = gql`
  query listing($_id: ID!) {
    listing(_id: $_id) {
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
      location {
        type
        coordinates
      }
    }
  }
`;

export const QUERY_LISTINGS = gql`
  query listings($type: String) {
    listings(type: $type) {
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
      location {
        type
        coordinates
      }
    }
  }
`;
