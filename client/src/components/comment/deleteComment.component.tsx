import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";

import { GQL_DELETE_COMMENT } from "../../constants/comment";
import { DeleteCommentProps } from "../../interface/comment.interface";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForever";

const DeleteComment = ({
  postId,
  commentId,
  comments,
  setComments,
  currentUser,
  userName,
}: DeleteCommentProps) => {
  const [deleteComment, { data }] = useMutation(GQL_DELETE_COMMENT, {
    variables: { postId: postId, commentId: commentId },
  });

  const handleSubmission = () => {
    if (window.confirm("Are you sure to delete this comment?") === true)
      deleteComment();
  };

  useEffect(() => {
    if (data?.deleteComment === "Comment deleted successfully") {
      const index = comments.map(comment => comment?.id).indexOf(commentId);

      const newComments = [...comments];
      newComments.splice(index, 1);

      setComments(newComments);
    }
  }, [data, comments, commentId, setComments]);

  if (currentUser === userName) {
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
};

export default DeleteComment;
