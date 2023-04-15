import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../../context/authContext";
import { DeletePostProps } from "../../interface/post.interface";
import { GQL_DELETE_POST } from "../../constants/post";
import { postsValue } from "../../context/postContext";
import { errorValue } from "../../context/errorContext";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

const DeletePost = ({ postId, userName }: DeletePostProps) => {
  const { user } = useContext(AuthContext);
  const [deletePost, { loading }] = useMutation(GQL_DELETE_POST, {
    variables: { postId: postId },
    onCompleted: () => {
      const index = postsValue()
        .map(post => post.id)
        .indexOf(postId);

      // deep copy the posts value
      const posts = [...postsValue()];
      posts?.splice(index, 1);

      postsValue(posts);
    },
    onError: error => {
      errorValue(error);
    },
  });

  const handleSubmission = () => {
    if (window.confirm("Are you sure to delete this ") === true) deletePost();
  };

  if (loading) {
    return <CircularProgress style={{ marginLeft: "50%" }} />;
  }

  if (user.userName === userName) {
    return (
      <IconButton onClick={handleSubmission}>
        <DeleteIcon />
      </IconButton>
    );
  } else {
    return <></>;
  }
};
export default DeletePost;
