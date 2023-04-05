import dotenv from "dotenv";

import { initialize, disconnect } from "./server";

dotenv.config();

let server;

export const init = async ({ typeDefs, resolvers, port }) => {
  server = await initialize({
    typeDefs: typeDefs,
    resolvers: resolvers,
    port: port,
  });
};

export const close = async () => await disconnect();

export const validContextValue = (val = true) => {
  return val
    ? { req: { headers: { authorization: process.env.LOGIN_TOKEN } } }
    : { req: { headers: { authorization: "Bearer a" } } };
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
  contextValue = validContextValue(),
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
