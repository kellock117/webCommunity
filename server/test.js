import mongoose from "mongoose";
import dotenv from "dotenv";

import Post from "./models/post.model.js";
import Comment from "./models/comment.model.js";

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

await mongoose.disconnect();
