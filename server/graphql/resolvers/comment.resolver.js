import Post from "../../models/post.model.js";
import Comment from "../../models/comment.model.js";
import checkAuth from "../../util/authentication.js";
import { UserInputError } from "apollo-server";

const commentResolver = {
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
      const user = checkAuth(context);
      const post = await Post.findById(postID);

      const comment = new Comment({
        content: content,
        userName: user.userName,
        time: new Date().toISOString(),
      });

      post.comments.push(comment);
      const res = await comment.save();
      post.save();
      return res;
    },
    deleteComment: async (_, { commentID }, context) => {
      const user = checkAuth(context);
      try {
        const comment = await Comment.findById(commentID);
        if (user.userName === comment.userName) {
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
        const checkLike = comment.likes.indexOf(user.userName);

        if (checkLike == -1) {
          comment.likes.push(user.userName);
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

export default commentResolver;
