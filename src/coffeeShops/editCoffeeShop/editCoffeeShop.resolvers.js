import client from "../../client";
import { resovlerProtector } from "../../users/users.utils";
import { processCategories } from "../coffeeShops.utils";

export default {
  Mutation: {
    editCoffeeShop: resovlerProtector(
      async (
        _,
        { id, name, latitude, longitude, categories },
        { loggedInUser }
      ) => {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: { id },
          include: {
            categories: {
              select: { name: true },
            },
          },
        });
        if (!coffeeShop) {
          return {
            ok: false,
            error: "Coffee Shop not found.",
          };
        } else if (coffeeShop.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized.",
          };
        }
        await client.coffeeShop.update({
          where: { id },
          data: {
            name,
            latitude,
            longitude,
            ...(categories && {
              categories: {
                disconnect: coffeeShop.categories,
                connectOrCreate: processCategories(categories),
              },
            }),
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
