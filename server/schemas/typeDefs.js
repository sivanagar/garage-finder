const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    listings: [Listing]
    host: Boolean
  }

  type Listing {
    _id: ID
    address: String
    type: String
    accessType: String
    height: Float
    width: Float
    depth: Float
    description: String
    rate: Float
    username: String
    climateControl: Boolean
    location {
      type: String
      coordinates: [Float]
    }
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    listing(_id: ID!): Listing
    listings(
      type: String
      rate: Float
      accessType: String
      climateControl: Boolean
      height: Float
      width: Float
      depth: Float
      location: {
        type: String
        coordinates: [Float]
      }
    ): [Listing]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      username: String!
      email: String!
      password: String!
      host: Boolean!
    ): Auth
    addListing(
      address: String!
      type: String!
      accessType: String!
      height: Float!
      width: Float!
      depth: Float!
      description: String!
      rate: Float!
      climateControl: Boolean!
      location: {
        type: String
        coordinates: [Float]
      }
    ): Listing
  }
`;

module.exports = typeDefs;
