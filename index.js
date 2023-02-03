import {  ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import {gql} from "apollo-server"

const typeDefs = gql`
type Query{
    greet:String
}
`

const resolvers = {
    Query: {
        greet: () => "Hello, world!"
    }
}

const server = new ApolloServer({ typeDefs, resolvers })






const { url } = await startStandaloneServer(server, { listen: { port: 8080 } })

console.log(`Server is listening on ${url}`);