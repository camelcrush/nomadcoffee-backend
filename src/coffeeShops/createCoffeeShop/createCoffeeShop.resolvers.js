import client from "../../client";
import { createWriteStream } from "fs";
import { resovlerProtector } from "../../users/users.utils";
import { handleFile, processCategories } from "../coffeeShops.utils";

export default {
  Mutation: {
    createCoffeeShop: resovlerProtector(
      async (
        _,
        { name, latitude, longitude, file, categories },
        { loggedInUser }
      ) => {
        console.log(file);
        return await client.coffeeShop.create({
          data: {
            name,
            ...(latitude && { latitude }),
            ...(longitude && { longitude }),
            user: {
              connect: { id: loggedInUser.id },
            },
            ...(file && {
              photos: {
                create: { url: await handleFile(file) },
              },
            }),
            ...(categories && {
              categories: { connectOrCreate: processCategories(categories) },
            }),
          },
        });
      }
    ),
  },
};
