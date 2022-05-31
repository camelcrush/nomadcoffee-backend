import { gql } from "apollo-server-core";

export default gql`
  type SearchUsersResponse {
    users: [User]
    totalPages: Int
  }
  type Query {
    searchUsers(keyword: String!, page: Int!): SearchUsersResponse!
  }
`;
