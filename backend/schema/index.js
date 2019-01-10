import { ApolloServer, gql } from 'apollo-server-express';
import { merge } from 'lodash';
import user from './user';
import jwt from 'jsonwebtoken';
import tokens from '../utils/tokens';


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
   playground: {
    endpoint: 'http://localhost:4000/graphql',
    settings: {
      'editor.theme': 'dark'
    }
  },
  context: ({ req }) => {
    // simple auth check on every request
    const token = req.headers.authorization;
    const user = new Promise((resolve, reject) => {
      jwt.verify(token, tokens.getKey, tokens.options, (err, decoded) => {
        if(err) {
          return reject(err);
        }
        resolve(decoded.email);
      });
    });

    return {
      user
    };
  },
});

export default schema;
