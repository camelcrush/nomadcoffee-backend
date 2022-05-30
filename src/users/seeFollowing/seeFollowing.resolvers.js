import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: (page - 1) * 5,
        });
      const totalFollowing = await client.user.count({
        where: { followers: { some: { username } } },
      });
      return {
        ok: true,
        following,
        totalFollowing: Math.ceil(totalFollowing / 5),
      };
    },
  },
};
