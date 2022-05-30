import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowingResponse {
    ok: Boolean!
    error: String
    following: [User]
    totalFollowing: Int
  }
  type Query {
    seeFollowing(username: String!, page: Int!): SeeFollowingResponse!
  }
`;
