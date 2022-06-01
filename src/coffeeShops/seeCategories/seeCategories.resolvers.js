import client from "../../client";

export default {
  Query: {
    seeCategories: (_, { offset }) =>
      client.category.findMany({ take: 5, skip: offset }),
  },
};
