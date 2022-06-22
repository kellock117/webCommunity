const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
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
