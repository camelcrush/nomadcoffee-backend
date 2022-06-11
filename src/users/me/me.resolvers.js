import client from "../../client";
import { resovlerProtector } from "../users.utils";

export default {
  Query: {
    me: resovlerProtector((_, __, { loggedInUser }) =>
      client.user.findUnique({ where: { id: loggedInUser.id } })
    ),
  },
};
