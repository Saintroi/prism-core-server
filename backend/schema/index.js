import { ApolloServer, gql } from 'apollo-server-express';
import { merge } from 'lodash';
import user from './user';
import jwt from 'jsonwebtoken';
import tokens from '../utils/tokens';
import config from 'config';
import auth from '../middleware/restrict'


const rootTypeDefs = gql`
  type Query {
    name: String
  }
  type Mutation {
    name: String
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

const rootResolvers = {
  Query: {
    name: () => 'Prism-Core',
  },
  Mutation: {
    name: () => 'Prism-Core',
  },
};

const resolvers = merge(
  rootResolvers,
  user.resolvers,
);

const typeDefs = [
  rootTypeDefs,
  user.typeDefs,
];

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    console.log(error);
    return new Error('Internal server error');
  },
   playground: {
    endpoint: config.get('app.url') + '/graphql',
    settings: {
      'editor.theme': 'dark'
    }
  },
  context: ({ req }) => {
    // simple auth check on every request
    return {
      user: req.user,
      tokenUser: req.tokenUser,
    };
  },
});

export default schema;
