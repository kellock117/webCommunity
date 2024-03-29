import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { GQL_LIKE_COMMENT } from "../../constants/comment";
import { LikeCommentProps } from "../../interface/comment.interface";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";

const LikeComment = (props: LikeCommentProps) => {
  const isUserLiked = props.likes.includes(props.currentUser);
  let likeCount = isUserLiked ? props.likes.length - 1 : props.likes.length;
  const [pressed, setPressed] = useState(isUserLiked);

  const [likeComment] = useMutation(GQL_LIKE_COMMENT, {
    variables: { commentId: props.id },
  });

  const handleSubmission = () => {
    setPressed(!pressed);
    likeComment();
  };

  return pressed ? (
    <IconButton onClick={handleSubmission} sx={{ color: "red", height: "1em" }}>
      <FavoriteIcon sx={{ mr: 0.5, fontSize: "10px" }} />
      <Typography fontSize="15px">{likeCount + 1}</Typography>
    </IconButton>
  ) : (
    <IconButton onClick={handleSubmission} sx={{ height: "1em" }}>
      <FavoriteIcon sx={{ mr: 0.5, fontSize: "10px" }} />
      <Typography sx={{ fontSize: "15px" }}>{likeCount}</Typography>
    </IconButton>
  );
};

export default LikeComment;
