import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const loadTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(loadTypes);
export const resolvers = mergeResolvers(loadResolvers);
