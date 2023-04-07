import Post from "../../models/post.model.js";
import User from "../../models/user.model.js";
import Comment from "../../models/comment.model.js";
import checkAuth from "../../util/authentication.js";
import { createNotification } from "./notification.resolver.js";
import { LIKE, COMMENT } from "../../constants/notification.js";

const isNull = comment => {
  if (comment === null) throw new Error("Comment not found");
};

// check whether the comment involves a metion or not.
// The form should be @ + characters. e.g. @doctor1118
const checkMention = async content => {
  const atSign = content.charAt(0) === "@";

  if (!atSign) return null;

  const spaceIdx = content.indexOf(" ");
  const string = content.substring(1, spaceIdx);

  const user = await User.findOne({ userName: string });

  return user?.userName;
};

// create the notification when the user leave the comment on the post or comment
const createCommentNotification = async ({
  post,
  postId,
  context,
  content,
}) => {
  const mention = await checkMention(content);

  // someone metioned or replied to the comment
  if (mention) {
    createNotification({
      userName: mention,
      postId: postId,
      action: COMMENT,
      context: context,
    });
  }

  // if mention id and owner of the post is not same. Prevent the duplication
  if (mention !== post.userName) {
    createNotification({
      userName: post.userName,
      postId: postId,
      action: COMMENT,
      context: context,
    });
  }
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
        postId: post._id,
      });

      const res = await comment.save();
      post.comments.push(comment);
      post.save();

      createCommentNotification({
        post: post,
        postId: postId,
        context: context,
        content: content,
      });

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

        await createNotification({
          userName: comment.userName,
          postId: comment.postId,
          action: LIKE,
          context: context,
        });
        return "liked";
      }

      comment.likes.splice(checkLike, 1);
      await comment.save();

      return "unliked";
    },
  },
};

export default commentResolver;
