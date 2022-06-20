const Post = require("../../models/post.js");
const checkAuth = require("../../util/authentication.js");
const { UserInputError } = require("apollo-server");

function postValidCheck(title, content) {
  if (title.trim() == "") throw new UserInputError("invalid title");
  if (content.trim() == "") throw new UserInputError("invalid content");
}

module.exports = {
  Query: {
    getPosts: async () => {
      const posts = await Post.find();
      return posts;
    },
  },
  Mutation: {
    createPost: async (_, { createPostInput: { title, content } }, context) => {
      // check validation
      const { userID } = checkAuth(context);
      postValidCheck(title, content);

      const post = new Post({
        title: title,
        userID: userID,
        content: content,
        time: new Date().toISOString(),
        likes: [],
        comments: [],
      });

      const res = await post.save();
      return res;
    },
    deletePost: async (_, { postID }, context) => {
      const { userID } = checkAuth(context);

      try {
        const post = await Post.findById(postID);
        if (userID === post.userID) {
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
      const { userID } = checkAuth(context);
      const post = await Post.findById(postID);

      if (post) {
        const checkLike = post.likes.find(like => like.userID == userID);
        if (!checkLike) {
          post.likes.push(userID);
        } else {
          post.likes.filter(like => like.userID != userID);
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
