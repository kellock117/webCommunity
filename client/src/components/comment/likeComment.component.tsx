import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../../context/authContext";
import { GQL_LIKE_COMMENT } from "../../constants/comment";
import { LikeCommentProps } from "../../interface/comment.interface";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";

const LikeComment = ({ commentId, likes }: LikeCommentProps) => {
  const {
    user: { userName },
  } = useContext(AuthContext);

  const isUserLiked: boolean = likes.includes(userName);
  let likeCount: number = isUserLiked ? likes.length - 1 : likes.length;

  const [pressed, setPressed] = useState<boolean>(isUserLiked);

  const [likeComment] = useMutation(GQL_LIKE_COMMENT, {
    variables: { commentId: commentId },
  });

  const handleSubmission = (): void => {
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
