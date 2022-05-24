require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import { resolvers, typeDefs } from "./schema";

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(PORT).then(() => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
