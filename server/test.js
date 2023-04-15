import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import Comment from "./models/comment.model.js";
import Notification from "./models/notification.model.js";

dotenv.config();

await mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })

  .catch(error => {
    console.error(error);
  });

mongoose.set("strictQuery", true);

const removeCommentInfoOnPost = async () => {
  let comments = await Comment.find();
  comments = comments.map(comment => comment._id.toString());

  const posts = await Post.find();

  for (const post of posts) {
    const commentsInPost = post.comments;

    const exist = commentsInPost.filter(comment =>
      comments.includes(comment.toString())
    );

    post.comments = exist;
    await post.save();
  }
};

const removeNotificationsAndNotificationsInfoOnUser = async () => {
  let notifications = await Notification.find();

  for (const notification of notifications) {
    await Notification.deleteOne({ _id: notification.id });
  }

  let users = await User.find();

  for (const user of users) {
    user.notifications = [];
    await user.save();
  }
};
await mongoose.disconnect();
