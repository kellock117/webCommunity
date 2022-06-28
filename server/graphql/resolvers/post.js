const Post = require("../../models/post.js");
const checkAuth = require("../../util/authentication.js");
const { UserInputError } = require("apollo-server");

function postValidCheck(title, content) {
  if (title.trim() == "") throw new UserInputError("invalid title");
  if (content.trim() == "") throw new UserInputError("invalid content");
}

module.exports = {
  Query: {
    getAllPosts: async () => {
      const posts = await Post.find();
      return posts;
    },
  },
  Mutation: {
    createPost: async (_, { createPostInput: { title, content } }, context) => {
      // check validation
      const user = checkAuth(context);

      postValidCheck(title, content);
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
      const user = checkAuth(context);
      const post = await Post.findById(postID);

      if (post) {
        const checkLike = post.likes.find(like => like.userID == user.id);
        if (!checkLike) {
          post.likes.push(user.id);
        } else {
          post.likes.filter(like => like.userID != user.id);
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
