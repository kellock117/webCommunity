import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../../context/authContext";
import { GQL_LIKE_POST } from "../../constants/post";
import { LikePostProps } from "../../interface/post.interface";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Like = ({ postId, likes }: LikePostProps) => {
  const { user } = useContext(AuthContext);

  const isUserLiked = likes.includes(user.userName);
  let likeCount = isUserLiked ? likes.length - 1 : likes.length;
  const [pressed, setPressed] = useState(isUserLiked);

  const [likePost] = useMutation(GQL_LIKE_POST, {
    variables: { postId: postId },
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
