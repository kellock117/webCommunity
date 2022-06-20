const Comment = require("../../models/comment.js");
const checkAuth = require("../../util/authentication.js");
const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    getComments: async () => {
      const comments = await Comment.find();
      return comments;
    },
  },
  Mutation: {
    createComment: async (_, { content }, context) => {
      const { userID } = checkAuth(context);
      if (content.trim() == "") throw new UserInputError("invalid content");

      const comment = new Comment(userID, content, new Date().toISOString());

      const res = comment.save();
      return res;
    },
    deleteComment: async (_, { commentID }, context) => {
      const { userID } = checkAuth(context);

      try {
        const comment = await Comment.findById(commentID);
        if (userID === comment.userID) {
          await comment.delete();
          return "Comment deleted successfully";
        } else {
          throw new AuthentificationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    likeComment: async (_, { commentID }, context) => {
      const { userID } = checkAuth(context);
      const comment = await Comment.findById(commentID);

      if (comment) {
        const checkLike = comment.likes.find(like => like.userID == userID);
        if (!checkLike) {
          comment.likes.push(userID);
        } else {
          comment.likes.filter(like => like.userID != userID);
        }

        await comment.save();
        return comment;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
