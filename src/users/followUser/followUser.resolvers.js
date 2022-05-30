import client from "../../client";
import { resovlerProtector } from "../users.utils";

export default {
  Mutation: {
    followUser: resovlerProtector(async (_, { username }, { loggedInUser }) => {
      const ok = await client.user.findUnique({ where: { username } });
      if (!ok) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: { connect: { username } },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
