import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";

import typeDefs from "./graphql/typeDefs/index.typeDefs.js";
import resolvers from "./graphql/resolvers/index.resolver.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: PORT });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(error => {
    console.error(error);
  });
