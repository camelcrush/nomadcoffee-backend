import { gql } from "apollo-server-core";

export default gql`
  type MutationResonse {
    ok: Boolean!
    id: Int
    error: String
  }
`;
