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
import { errorValue } from "../../context/errorContext";
import { postsValue } from "../../context/postContext";

const NewComment = ({ postId, setComments }: NewCommentProps) => {
  const { onChange, onSubmit, values } = useForm(createCommentCallback, {
    postId: postId,
    content: "",
  });

  const [createComment, { loading }] = useMutation(GQL_CREATE_COMMENT, {
    variables: values,

    onCompleted: data => {
      setComments(current => [data.createComment, ...current]);

      const posts = postsValue();
      const commentedPost = { ...posts.find(post => post.id === postId) };
      const comments = [...commentedPost.comments];
      comments.push(data.createComment.id);

      commentedPost.comments = comments;

      const newPosts = posts.map(post =>
        post.id === postId ? commentedPost : post
      );

      postsValue(newPosts);
    },
    onError: error => {
      errorValue(error);
    },
  });

  function createCommentCallback(): void {
    createComment();
  }
  const commentBoxSize: string = isMobile ? "29ch" : "49ch";

  if (loading) {
    return <CircularProgress style={{ marginLeft: "40%" }} />;
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
