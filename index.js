import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "apollo-server";

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
    }
];

const typeDefs = gql`
  type Query {
    users:[User]
    user(id:ID!):User
  }

  type User{
    id:ID
    firstName: String
    lastName: String
    email: String
  }


  
`;

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, args, context) => {
            return users.find(user=>user.id===args.id)
        }
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 8080 } });

console.log(`Server is listening on ${url}`);
