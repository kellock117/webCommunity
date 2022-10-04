import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForever";

interface Props {
  postID: React.Key;
  currentUser: string;
  userID: string;
}

export default function DeletePost(props: Props) {
  const [deletePost] = useMutation(GQL_DELETE_POST, {
    refetchQueries: [{ query: GQL_GET_ALL_POSTS }],
    variables: { postID: props.postID },
  });

  const handleSubmission = () => {
    if (window.confirm("Are you sure to delete this post?") === true)
      deletePost();
  };

  if (props.currentUser === props.userID) {
    return (
      <IconButton onClick={handleSubmission}>
        <DeleteIcon />
      </IconButton>
    );
  } else {
    return <></>;
  }
}

const GQL_DELETE_POST = gql`
  mutation DeletePost($postID: ID!) {
    deletePost(postID: $postID)
  }
`;

const GQL_GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      title
      userID
      content
      time
      likes
      comments {
        userID
        content
        time
        likes
      }
    }
  }
`;
