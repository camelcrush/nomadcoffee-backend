import { gql } from "apollo-server-core";

export default gql`
  type Query {
    hello: String!
  }
  type CreateAccountResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      password: String!
      location: String
      avatarUrl: String
      githubUsername: String
    ): CreateAccountResponse!
  }
`;
