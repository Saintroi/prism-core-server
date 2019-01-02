import { ApolloServer, gql } from 'apollo-server-express';
import { merge } from 'lodash';
import user from './user';

const rootTypeDefs = `
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
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'dark'
    }
  }
});

export default schema;
