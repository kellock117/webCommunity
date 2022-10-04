const Post = require("../../models/post.js");
const checkAuth = require("../../util/authentication.js");
const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    getAllPosts: async () => {
      const posts = await Post.find().sort({ time: -1 });
      return posts;
    },
  },
  Mutation: {
    createPost: async (_, { createPostInput: { title, content } }, context) => {
      // check validation
      const user = checkAuth(context);

      const post = new Post({
        title: title,
        userID: user.id,
        content: content,
        time: new Date().toISOString(),
      });

      const res = await post.save();
      return res;
    },
    deletePost: async (_, { postID }, context) => {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postID);
        if (user.id === post.userID) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthentificationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    likePost: async (_, { postID }, context) => {
      console.log(user);
      const user = checkAuth(context);
      const post = await Post.findById(postID);

      if (post) {
        const checkLike = post.likes.indexOf(user.id);

        if (checkLike == -1) {
          post.likes.push(user.id);
        } else {
          post.likes.splice(checkLike, 1);
        }

        await post.save();
        return post.likes;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
