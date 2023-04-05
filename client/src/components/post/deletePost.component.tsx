import React from "react";
import { useMutation } from "@apollo/react-hooks";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForever";

import { GQL_DELETE_POST } from "../../constants/post";
interface Props {
  postId: React.Key;
  currentUser: string;
  userName: string;
}

export default function DeletePost(props: Props) {
  const [deletePost] = useMutation(GQL_DELETE_POST, {
    // refetchQueries: [{ query: GQL_GET_ALL_POSTS }],
    variables: { postId: props.postId },
  });

  const handleSubmission = () => {
    if (window.confirm("Are you sure to delete this post?") === true)
      deletePost();
  };

  if (props.currentUser === props.userName) {
    return (
      <IconButton onClick={handleSubmission}>
        <DeleteIcon />
      </IconButton>
    );
  } else {
    return <></>;
  }
}
