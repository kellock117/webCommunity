import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface props {
  id: React.Key;
  currentUser: string;
  likes: string[];
}

export default function Like(props: props) {
  const isUserLiked = props.likes.includes(props.currentUser);
  let likeCount = isUserLiked ? props.likes.length - 1 : props.likes.length;
  const [pressed, setPressed] = useState(isUserLiked);

  const [likePost] = useMutation(GQL_LIKE_POST, {
    variables: { postID: props.id },
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
}

const GQL_LIKE_POST = gql`
  mutation LikePost($postID: ID!) {
    likePost(postID: $postID) {
      likes
    }
  }
`;
