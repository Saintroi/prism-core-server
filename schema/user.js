import api from '../api';
import auth from '../middleware/auth';
import utils from '../utils/schema';
import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    id: Int!
    name: String
    firstName: String!
    lastName: String!
    email: String!
    type: String
    cellPhone: String
    officePhone: String
    title: String
    location: String
    admin: Boolean
  }
  type TokenResponse {
    token: String!
    email: String
    phone: String
  }
  extend type Query {
    me: User
    users (firstName: String, lastName: String): [User]
  }
  input UserInput{
    firstName: String!
    lastName: String!
    email: String!
    type: String
    cellPhone: String
    officePhone: String
    title: String
    location: String
    admin: Boolean
  }

  extend type Mutation {
    grantAdmin (
      id: String
    ): User
    revokeAdmin (
      id: String
    ): User
    createUser (
      input: UserInput
    ): User
    login (
      email: String
      auth: String
    ): Boolean
  }
`;

const resolvers = {
  Query: {
    me: utils.wrap(auth.restrict, api.user.getMe),
    users: utils.wrap(api.user.getAll),
  },
  Mutation: {
    grantAdmin: utils.wrap(auth.restrictToAdmin, api.user.grantAdmin),
    revokeAdmin: utils.wrap(auth.restrictToAdmin, api.user.revokeAdmin),
    createUser: utils.wrap(api.user.createUser),
    login: utils.wrap(api.user.login)
  },
  User: {
    name: user => `${user.firstName} ${user.lastName}`,
  },
};

module.exports = {
  typeDefs,
  resolvers,
};