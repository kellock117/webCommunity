import Post from "../../models/post.model.js";
import Comment from "../../models/comment.model.js";
import checkAuth from "../../util/authentication.js";

const isNull = comment => {
  if (comment === null) throw new Error("Comment not found");
};

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

      if (post === null) throw new Error("Post not found");

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

      const comment = await Comment.findById(commentId);
      isNull(comment);

      if (user.userName !== comment?.userName)
        throw new Error("Action not allowed");

      await comment.delete();

      return "Comment deleted successfully";
    },
    likeComment: async (_, { commentId }, context) => {
      const user = checkAuth(context);
      const comment = await Comment.findById(commentId);

      isNull(comment);

      const checkLike = comment.likes.indexOf(user.userName);

      if (checkLike == -1) {
        comment.likes.push(user.userName);
        await comment.save();
        return "liked";
      }

      comment.likes.splice(checkLike, 1);
      await comment.save();

      return "unliked";
    },
  },
};

export default commentResolver;
