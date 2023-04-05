import dotenv from "dotenv";

import { initialize, disconnect } from "./server";

dotenv.config();

let server;

export const init = async ({ typeDefs, resolvers }) => {
  server = await initialize({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });
};

export const close = async () => await disconnect();

export const createContextValue = (val = process.env.LOGIN_TOKEN) => {
  return { req: { headers: { authorization: val } } };
};

const unwrap = val => {
  const {
    body: { singleResult },
  } = val;
  return singleResult;
};

export const run = async ({
  query,
  variables,
  contextValue = createContextValue(),
}) =>
  unwrap(
    await server.executeOperation(
      {
        query: query,
        variables: variables,
      },
      { contextValue: contextValue }
    )
  );
