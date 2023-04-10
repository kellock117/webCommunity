import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useMutation } from "@apollo/react-hooks";

import { NewCommentProps } from "../../interface/comment.interface";
import { useForm } from "../../util/hooks";
import { GQL_CREATE_COMMENT } from "../../constants/comment";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const NewComment = ({ postId, setComments }: NewCommentProps) => {
  const { onChange, onSubmit, values } = useForm(createCommentCallback, {
    postId: postId,
    content: "",
  });

  const [createComment, { data, loading, error }] = useMutation(
    GQL_CREATE_COMMENT,
    {
      variables: values,
    }
  );

  function createCommentCallback() {
    createComment();
  }
  const commentBoxSize: string = isMobile ? "29ch" : "49ch";

  useEffect(() => {
    if (data && !loading)
      setComments(current => [data?.createComment, ...current]);
  }, [data, loading, setComments]);

  if (loading) {
    return <CircularProgress style={{ marginLeft: "40%" }} />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid item xs={12}>
        <TextField
          required
          title="content"
          label="Add Comment..."
          name="content"
          autoFocus
          onChange={onChange}
          sx={{ m: 2, width: commentBoxSize }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3 }} size="large">
          Add
        </Button>
      </Grid>
    </Box>
  );
};

export default NewComment;
