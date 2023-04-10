import postResolver from "./post.resolver.js";
import userResolver from "./user.resolver.js";
import commentResolver from "./comment.resolver.js";
import notificationResolver from "./notification.resolver.js";

const resolvers = {
  Query: {
    ...postResolver.Query,
    ...commentResolver.Query,
    ...notificationResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
    ...notificationResolver.Mutation,
  },
};

export default resolvers;
