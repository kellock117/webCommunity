import Post from "../../models/post.model.js";
import checkAuth from "../../util/authentication.js";

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

      try {
        const post = await Post.findById(postId);
        if (user.userName === post?.userName) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new Error("Action not allowed");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    likePost: async (_, { postId }, context) => {
      const user = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        const checkLike = post.likes.indexOf(user.userName);

        if (checkLike == -1) {
          post.likes.push(user.userName);
          await post.save();
          return "liked";
        }
        post.likes.splice(checkLike, 1);
        await post.save();

        return "unliked";
      } else {
        throw new Error("Post not found");
      }
    },
  },
};

export default postResolver;
