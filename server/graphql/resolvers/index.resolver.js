import postResolver from "./post.resolver.js";
import userResolver from "./user.resolver.js";
import commentResolver from "./comment.resolver.js";

const resolvers = {
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

export default resolvers;
