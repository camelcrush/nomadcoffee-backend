import bcrypt from "bcrypt";
import { createWriteStream } from "fs";
import client from "../../client";
import { resovlerProtector } from "../users.utils";

export default {
  Mutation: {
    editProfile: resovlerProtector(
      async (
        _,
        {
          username,
          email,
          name,
          password: newPassword,
          location,
          avatarUrl,
          githubUsername,
        },
        { loggedInUser }
      ) => {
        let avatarLocation = null;
        if (avatarUrl) {
          const { filename, createReadStream } = await avatarUrl;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            `${process.cwd()}/uploads/${newFilename}`
          );
          readStream.pipe(writeStream);
          avatarLocation = `http://localhost:4000/static/${newFilename}`;
        }

        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }
        const updateUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            username,
            email,
            name,
            location,
            githubUsername,
            ...(hashedPassword && { password: hashedPassword }),
            ...(avatarLocation && { avatarUrl: avatarLocation }),
          },
        });
        if (updateUser) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Can't update profile",
          };
        }
      }
    ),
  },
};
