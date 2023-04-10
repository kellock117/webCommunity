import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";

import { DeletePostProps } from "../../interface/post.interface";
import { GQL_DELETE_POST } from "../../constants/post";
import { postsValue } from "../../context/postContext";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForever";

const DeletePost = (post: DeletePostProps) => {
  const [deletePost, { data }] = useMutation(GQL_DELETE_POST, {
    variables: { postId: post.postId },
  });

  const handleSubmission = () => {
    if (window.confirm("Are you sure to delete this post?") === true)
      deletePost();
  };

  useEffect(() => {
    if (data?.deletePost === "Post deleted successfully") {
      const index = postsValue()
        .map(post => post?.id)
        .indexOf(post?.postId);

      // deep copy the posts value
      const posts = [...postsValue()];
      posts?.splice(index, 1);

      postsValue(posts);
    }
  }, [data, post]);

  if (post.currentUser === post.userName) {
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
