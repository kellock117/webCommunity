import Post from "../../models/post.model.js";
import checkAuth from "../../util/authentication.js";
import { createNotification } from "./notification.resolver.js";
import { LIKEPOST } from "../../constants/notification.js";

const isNull = post => {
  if (post === null) throw new Error("Post not found");
};

const postResolver = {
  Query: {
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);

        return post;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getPostByPage: async (_, { getPostByPageInput: { page, lastPostId } }) => {
      try {
        // use fast pagination with lastPostId from the second page
        const options = page > 1 ? { _id: { $lt: lastPostId } } : {};

        const posts = await Post.find(options).limit(10).sort({ $natural: -1 });

        return posts;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createPost: async (_, { createPostInput: { title, content } }, context) => {
      try {
        // check validation
        const user = checkAuth(context);

        const post = new Post({
          title: title,
          userName: user.userName,
          content: content,
        });

        const res = await post.save();
        return res;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deletePost: async (_, { postId }, context) => {
      try {
        const user = checkAuth(context);

        const post = await Post.findById(postId);
        isNull(post);

        if (user.userName !== post.userName)
          throw new Error("Action not allowed");

        post.deleteOne({ _id: postId });

        return "Post deleted successfully";
      } catch (error) {
        throw new Error(error.message);
      }
    },
    likePost: async (_, { postId }, context) => {
      try {
        const user = checkAuth(context);

        const post = await Post.findById(postId);
        isNull(post);

        // find the index of the user name
        const checkLike = post.likes.indexOf(user.userName);

        // index -1 means no like
        if (checkLike === -1) {
          post.likes.push(user.userName);
          await post.save();

          createNotification({
            userName: post.userName,
            postId: postId,
            action: LIKEPOST,
            context: context,
          });
          return "liked";
        }

        post.likes.splice(checkLike, 1);
        post.save();

        return "unliked";
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

export default postResolver;
