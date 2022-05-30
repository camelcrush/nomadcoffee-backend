import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowersResponse {
    ok: Boolean!
    error: String
    followers: [User]
    totalFollowers: Int
  }
  type Query {
    seeFollowers(username: String!, page: Int!): SeeFollowersResponse!
  }
`;
