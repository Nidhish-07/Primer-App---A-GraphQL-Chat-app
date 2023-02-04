import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "apollo-server";
import { randomUUID } from "crypto";

const users = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@gmail.com",
  },
];

const todos = [
  {
    title: "buy milk",
    by: "1",
  },
  {
    title: "clean house",
    by: "2",
  },
  {
    title: "water plants",
    by: "1",
  },
];

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    todos: [Todo]
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(newUser: UserInput!): User
  }

  type Todo {
    title: String!
    by: ID!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args, context) => users.find((user) => user.id === args.id),
  },
  Mutation: {
    createUser: (parent, args, context) => {
      const userNew = { id: randomUUID(), ...args.newUser };
      users.push(userNew);

      return userNew;
    },
  },
  User: {
    todos: (parent) => todos.filter((todo) => todo.by === parent.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 8080 } });

console.log(`Server is listening on ${url}`);
