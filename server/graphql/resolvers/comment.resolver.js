import Post from "../../models/post.model.js";
import Comment from "../../models/comment.model.js";
import checkAuth from "../../util/authentication.js";

const commentResolver = {
  Query: {
    getComments: async (_, { postId }) => {
      const post = await Post.findById(postId).populate("comments");

      const comments = post.comments;

      return comments;
    },
  },
  Mutation: {
    createComment: async (
      _,
      { createCommentInput: { postId, content } },
      context
    ) => {
      const user = checkAuth(context);
      const post = await Post.findById(postId);

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
    deleteComment: async (_, { commentId }, context) => {
      const user = checkAuth(context);
      try {
        const comment = await Comment.findById(commentId);
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
    likeComment: async (_, { commentId }, context) => {
      const user = checkAuth(context);
      const comment = await Comment.findById(commentId);

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
        throw new Error("Comment not found");
      }
    },
  },
};

export default commentResolver;
