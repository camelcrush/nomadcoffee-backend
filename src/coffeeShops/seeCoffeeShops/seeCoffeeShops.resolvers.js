import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: (_, { offset }, { loggedInUser }) =>
      client.coffeeShop.findMany({
        take: 3,
        skip: offset,
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
