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
      listings {
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
  query listings(
    $type: String
    $rate: Float
    $accessType: String
    $climateControl: Boolean
    $height: Float
    $width: Float
    $depth: Float
    $location: locationInput
    $distance: Int
  ) {
    listings(
      type: $type
      rate: $rate
      accessType: $accessType
      climateControl: $climateControl
      height: $height
      width: $width
      depth: $depth

      location: $location
      distance: $distance
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
      location {
        type
        coordinates
      }
    }
  }
`;

export const QUERY_ALL_LISTINGS = gql`
  query Listings {
    listings {
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
