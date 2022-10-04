const Comment = require("../../models/comment.js");
const checkAuth = require("../../util/authentication.js");
const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    getComments: async (_, { postID }) => {
      const comments = await Comment.find({ postID: postID });

      return comments;
    },
  },
  Mutation: {
    createComment: async (
      _,
      { createCommentInput: { postID, content } },
      context
    ) => {
      const { id } = checkAuth(context);
      if (content.trim() == "") throw new UserInputError("invalid content");

      const comment = new Comment({
        postID: postID,
        content: content,
        userID: id,
        time: new Date().toISOString(),
      });

      const res = await comment.save();
      return res;
    },
    deleteComment: async (_, { commentID }, context) => {
      const user = checkAuth(context);
      try {
        const comment = await Comment.findById(commentID);
        if (user.id === comment.userID) {
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
      const user = checkAuth(context);
      const comment = await Comment.findById(commentID);

      if (comment) {
        const checkLike = comment.likes.indexOf(user.id);

        if (checkLike == -1) {
          comment.likes.push(user.id);
        } else {
          comment.likes.splice(checkLike, 1);
        }

        await comment.save();
        return comment;
      } else {
        throw new UserInputError("Comment not found");
      }
    },
  },
};
