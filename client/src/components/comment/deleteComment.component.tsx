import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForever";

interface Props {
  postID: React.Key;
  commentID: React.Key;
  currentUser: string;
  userID: string;
}

export default function DeletePost(props: Props) {
  const [deleteComment] = useMutation(GQL_DELETE_COMMENT, {
    refetchQueries: [
      { query: GQL_GET_COMMENTS, variables: { postID: props.postID } },
    ],
    variables: { commentID: props.commentID },
  });

  const handleSubmission = () => {
    if (window.confirm("Are you sure to delete this comment?") === true)
      deleteComment();
  };

  if (props.currentUser === props.userID) {
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

const GQL_DELETE_COMMENT = gql`
  mutation DeleteComment($commentID: ID!) {
    deleteComment(commentID: $commentID)
  }
`;

const GQL_GET_COMMENTS = gql`
  query GetComments($postID: String!) {
    getComments(postID: $postID) {
      id
      userID
      content
      time
      likes
    }
  }
`;
