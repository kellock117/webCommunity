import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

dotenv.config();

const PORT = process.env.TEST_PORT || 5000;

let server;

export const initialize = async ({ typeDefs, resolvers }) => {
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
      await startStandaloneServer(server, {
        listen: { port: PORT },
      });
    })
    .catch(error => {
      console.error(error);
    });

  return server;
};

export const disconnect = async () => {
  await mongoose.connection.close();
  server.stop();
};
