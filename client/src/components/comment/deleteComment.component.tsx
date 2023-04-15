import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../../context/authContext";
import { GQL_DELETE_COMMENT } from "../../constants/comment";
import { DeleteCommentProps } from "../../interface/comment.interface";
import { errorValue } from "../../context/errorContext";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { postsValue } from "../../context/postContext";

const DeleteComment = ({
  postId,
  commentId,
  comments,
  setComments,
  userName,
}: DeleteCommentProps) => {
  const { user } = useContext(AuthContext);
  const [deleteComment, { loading }] = useMutation(GQL_DELETE_COMMENT, {
    variables: { postId: postId, commentId: commentId },
    onCompleted: () => {
      const index = comments.map(comment => comment?.id).indexOf(commentId);

      const newComments = [...comments];
      newComments.splice(index, 1);

      setComments(newComments);

      const posts = postsValue();
      const commentedPost = { ...posts.find(post => post.id === postId) };
      const commentsOnCommentedPost = [...commentedPost.comments];
      commentsOnCommentedPost.splice(0, 1);
      commentedPost.comments = commentsOnCommentedPost;

      const newPosts = posts.map(post =>
        post.id === postId ? commentedPost : post
      );
      postsValue(newPosts);
    },
    onError: error => {
      errorValue(error);
    },
  });

  const handleSubmission = (): void => {
    if (window.confirm("Are you sure to delete this comment?") === true)
      deleteComment();
  };

  if (loading) {
    return <CircularProgress style={{ marginLeft: "50%" }} />;
  }

  return (
    <React.Fragment>
      {user.userName === userName ? (
        <IconButton
          onClick={handleSubmission}
          sx={{ height: "1em", float: "right" }}
        >
          <DeleteIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default DeleteComment;
