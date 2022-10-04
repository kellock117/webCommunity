import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";

interface props {
  id: React.Key;
  currentUser: string;
  likes: string[];
}

export default function Like(props: props) {
  const isUserLiked = props.likes.includes(props.currentUser);
  let likeCount = isUserLiked ? props.likes.length - 1 : props.likes.length;
  const [pressed, setPressed] = useState(isUserLiked);

  const [likeComment] = useMutation(GQL_LIKE_COMMENT, {
    variables: { commentID: props.id },
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
}

const GQL_LIKE_COMMENT = gql`
  mutation LikeComment($commentID: ID!) {
    likeComment(commentID: $commentID) {
      likes
    }
  }
`;
