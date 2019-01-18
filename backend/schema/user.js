import api from '../api';
import { gql } from 'apollo-server-express'
import utils from '../utils/schema';
import auth from '../middleware/restrict';


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
    createUser (
      input: UserInput
    ): User
  }
`;

const resolvers = {
  Query: {
    me: utils.wrap(auth.restrict, api.user.getMe),
    users: utils.wrap(auth.restrict, api.user.getAll)
  },
  Mutation: {
    createUser: utils.wrap(auth.restrict,api.user.createUser)
  },
  User: {
    name: user => `${user.firstName} ${user.lastName}`,
  },
};

module.exports = {
  typeDefs,
  resolvers,
};