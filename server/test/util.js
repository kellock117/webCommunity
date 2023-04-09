import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDefs from "../graphql/typeDefs/index.typeDefs.js";
import resolvers from "../graphql/resolvers/index.resolver.js";

dotenv.config();

let server;

export const init = async ({ port }) => {
  server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      return await startStandaloneServer(server, {
        listen: { port: port },
      });
    })
    .catch(error => {
      console.error(error);
    });

  return server;
};

// set up jwt token
const validContextValue = {
  req: { headers: { authorization: process.env.LOGIN_TOKEN } },
};

export const anotherValidContextValue = {
  req: { headers: { authorization: process.env.LOGIN_TOKEN2 } },
};

export const invalidContextValue = {
  req: { headers: { authorization: "Bearer a" } },
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
  contextValue = validContextValue,
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
