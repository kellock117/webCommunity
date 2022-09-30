import React from "react";
import { useForm } from "../util/hooks";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

interface Comment {
  content: string;
  userID: string;
  time: string;
  likes: string[];
}

interface Props {
  postID: React.Key;
  expanded: boolean;
}

export default function Comment(props: Props) {
  const { data, loading, error } = useQuery(GQL_GET_COMMENTS, {
    variables: {
      postID: props.postID,
    },
  });
  const { getComments: comments } = data || [];

  const { onChange, onSubmit, values } = useForm(createCommentCallBack, {
    postID: props.postID,
    content: "",
  });

  const [createComment] = useMutation(GQL_CREATE_COMMENT, {
    variables: values,
  });

  function createCommentCallBack() {
    createComment();
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (data) {
    return (
      <Collapse in={props.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {{ comments } &&
            comments.map((comment: Comment) => {
              return <Typography>{comment.content}</Typography>;
            })}
        </CardContent>
        <Box component="form" onSubmit={onSubmit}>
          <Grid item xs={12}>
            <TextField
              required
              title="content"
              label="Add Comment..."
              name="content"
              autoFocus
              onChange={onChange}
              sx={{ m: 2, width: "67ch" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              size="large"
            >
              Add
            </Button>
          </Grid>
        </Box>
      </Collapse>
    );
  }
}

const GQL_GET_COMMENTS = gql`
  query GetComments($postID: String!) {
    getComments(postID: $postID) {
      userID
      content
      time
      likes
    }
  }
`;

const GQL_CREATE_COMMENT = gql`
  mutation createCommentCallback($postID: String!, $content: String!) {
    createComment(createCommentInput: { postID: $postID, content: $content }) {
      userID
      content
      time
      likes
    }
  }
`;
