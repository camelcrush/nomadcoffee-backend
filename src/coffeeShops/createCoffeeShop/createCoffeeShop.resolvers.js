import client from "../../client";
import { createWriteStream } from "fs";
import { resovlerProtector } from "../../users/users.utils";
import { processCategories } from "../coffeeShops.utils";

export default {
  Mutation: {
    createCoffeeShop: resovlerProtector(
      async (
        _,
        { name, latitude, longitude, file, categories },
        { loggedInUser }
      ) => {
        let fileUrl = null;
        if (file) {
          const { filename, createReadStream } = await file;
          const newFilename = `${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            `${process.cwd()}/uploads/${newFilename}`
          );
          readStream.pipe(writeStream);
          fileUrl = `http://localhost:4000/static/${newFilename}`;
        }
        let categoryObj = [];
        if (categories) {
          categoryObj = processCategories(categories);
        }
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
                create: { url: fileUrl },
              },
            }),
            ...(categoryObj.length > 0 && {
              categories: { connectOrCreate: categoryObj },
            }),
          },
        });
      }
    ),
  },
};
