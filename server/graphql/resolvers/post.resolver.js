import Post from "../../models/post.model.js";
import checkAuth from "../../util/authentication.js";
import { createNotification } from "./notification.resolver.js";
import { LIKE } from "../../constants/notification.js";

const isNull = post => {
  if (post === null) throw new Error("Post not found");
};

const postResolver = {
  Query: {
    getPostByPage: async (_, { getPostByPageInput: { page, lastPostId } }) => {
      // use fast pagination with lastPostId from the second page
      const options = page > 1 ? { _id: { $lt: lastPostId } } : {};

      const posts = await Post.find(options).limit(10).sort({ $natural: -1 });

      return posts;
    },
  },
  Mutation: {
    createPost: async (_, { createPostInput: { title, content } }, context) => {
      // check validation
      const user = checkAuth(context);

      const post = new Post({
        title: title,
        userName: user.userName,
        content: content,
      });

      const res = await post.save();
      return res;
    },
    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);

      const post = await Post.findById(postId);
      isNull(post);

      if (user.userName !== post?.userName)
        throw new Error("Action not allowed");

      await post.delete();
      return "Post deleted successfully";
    },
    likePost: async (_, { postId }, context) => {
      const user = checkAuth(context);

      const post = await Post.findById(postId);
      isNull(post);

      const checkLike = post.likes.indexOf(user.userName);

      if (checkLike == -1) {
        post.likes.push(user.userName);
        post.save();

        await createNotification({
          userName: post.userName,
          postId: postId,
          action: LIKE,
          context: context,
        });
        return "liked";
      }

      post.likes.splice(checkLike, 1);
      post.save();

      return "unliked";
    },
  },
};

export default postResolver;
