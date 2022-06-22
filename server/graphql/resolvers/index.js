const postResolver = require("./post.js");
const userResolver = require("./user.js");
const commentResolver = require("./comment.js");

module.exports = {
  Query: {
    ...postResolver.Query,
    ...commentResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
  },
};
