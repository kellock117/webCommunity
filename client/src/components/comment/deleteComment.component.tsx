import React from "react";
import { useMutation } from "@apollo/react-hooks";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForever";

import { GQL_GET_COMMENTS, GQL_DELETE_COMMENT } from "../../constants/comment";
interface Props {
  postId: React.Key;
  commentId: React.Key;
  currentUser: string;
  userName: string;
}

export default function DeletePost(props: Props) {
  const [deleteComment] = useMutation(GQL_DELETE_COMMENT, {
    refetchQueries: [
      { query: GQL_GET_COMMENTS, variables: { postId: props.postId } },
    ],
    variables: { commentId: props.commentId },
  });

  const handleSubmission = () => {
    if (window.confirm("Are you sure to delete this comment?") === true)
      deleteComment();
  };

  if (props.currentUser === props.userName) {
    return (
      <IconButton
        onClick={handleSubmission}
        sx={{ height: "1em", float: "right" }}
      >
        <DeleteIcon sx={{ fontSize: "20px" }} />
      </IconButton>
    );
  } else {
    return <></>;
  }
}
