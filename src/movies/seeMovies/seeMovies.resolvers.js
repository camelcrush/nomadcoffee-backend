import client from "../../client";

export default {
  Query: {
    seeMovies: () => client.movie.findMany(),
  },
};
