import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { GQL_LIKE_POST } from "../../constants/post";
import { LikePostProps } from "../../interface/post.interface";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Like = (post: LikePostProps) => {
  const isUserLiked = post.likes.includes(post.currentUser);
  let likeCount = isUserLiked ? post.likes.length - 1 : post.likes.length;
  const [pressed, setPressed] = useState(isUserLiked);

  const [likePost] = useMutation(GQL_LIKE_POST, {
    variables: { postId: post.id },
  });

  const handleSubmission = () => {
    setPressed(!pressed);
    likePost();
  };

  return pressed ? (
    <IconButton onClick={handleSubmission} style={{ color: "red" }}>
      <FavoriteIcon sx={{ mr: 0.5 }} />
      {likeCount + 1}
    </IconButton>
  ) : (
    <IconButton onClick={handleSubmission}>
      <FavoriteIcon sx={{ mr: 0.5 }} />
      {likeCount}
    </IconButton>
  );
};

export default Like;
